import stripe
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.config import settings
from app.models.models import User, TierEnum
from app.routers.auth import get_current_user

stripe.api_key = settings.STRIPE_SECRET_KEY
router = APIRouter()

@router.post("/create-checkout")
def create_checkout(user: User = Depends(get_current_user)):
    """Create a Stripe checkout session for Pro subscription."""
    session = stripe.checkout.Session.create(
        customer_email=user.email,
        payment_method_types=["card"],
        line_items=[{"price": settings.STRIPE_PRICE_ID, "quantity": 1}],
        mode="subscription",
        subscription_data={"trial_period_days": settings.STRIPE_TRIAL_DAYS},
        success_url="https://burmalingo.com/dashboard?upgraded=true",
        cancel_url="https://burmalingo.com/pricing",
        metadata={"user_id": str(user.id)},
    )
    return {"url": session.url}

@router.post("/portal")
def billing_portal(user: User = Depends(get_current_user)):
    """Stripe billing portal — let user manage/cancel their subscription."""
    if not user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No active subscription")
    session = stripe.billing_portal.Session.create(
        customer=user.stripe_customer_id,
        return_url="https://burmalingo.com/dashboard",
    )
    return {"url": session.url}

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Stripe sends events here. We listen for:
    - checkout.session.completed  → flip user to pro
    - customer.subscription.deleted → flip user back to free
    """
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(payload, sig, settings.STRIPE_WEBHOOK_SECRET)
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = int(session["metadata"]["user_id"])
        customer_id = session["customer"]
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.tier = TierEnum.pro
            user.stripe_customer_id = customer_id
            db.commit()

    elif event["type"] in ("customer.subscription.deleted", "customer.subscription.paused"):
        customer_id = event["data"]["object"]["customer"]
        user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
        if user:
            user.tier = TierEnum.free
            db.commit()

    return {"received": True}
