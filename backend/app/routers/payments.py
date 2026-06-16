import stripe
from datetime import datetime, timezone
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
        success_url="https://burmalingo.vercel.app/dashboard?upgraded=true",
        cancel_url="https://burmalingo.vercel.app/pricing",
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


def _period_from_subscription(sub) -> tuple[datetime, datetime]:
    """Extract current_period_start/end from items.data[0] (Stripe Basil+ layout)."""
    item = sub["items"]["data"][0]
    period_start = datetime.fromtimestamp(item["current_period_start"], tz=timezone.utc)
    period_end   = datetime.fromtimestamp(item["current_period_end"],   tz=timezone.utc)
    return period_start, period_end


def _sync_subscription(user: User, sub) -> None:
    """Write subscription ID and billing period onto the user object (no commit)."""
    period_start, period_end = _period_from_subscription(sub)
    user.stripe_subscription_id = sub["id"]
    user.stripe_period_start    = period_start
    user.stripe_period_end      = period_end


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Events handled:
      checkout.session.completed        — flip user to Pro, store IDs + billing period
      customer.subscription.created     — sync period (covers edge cases outside checkout)
      customer.subscription.updated     — sync period on every renewal
      customer.subscription.deleted     — flip user back to Free, clear period
      customer.subscription.paused      — flip user back to Free, clear period
    """
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(payload, sig, settings.STRIPE_WEBHOOK_SECRET)
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    etype = event["type"]
    obj   = event["data"]["object"]

    # ── checkout.session.completed ────────────────────────────────────────────
    if etype == "checkout.session.completed":
        user_id     = int(obj["metadata"]["user_id"])
        customer_id = obj["customer"]
        sub_id      = obj["subscription"]

        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.tier               = TierEnum.pro
            user.stripe_customer_id = customer_id
            # Retrieve the full subscription to get the billing period
            if sub_id:
                sub = stripe.Subscription.retrieve(sub_id)
                _sync_subscription(user, sub)
            db.commit()

    # ── subscription created or renewed ──────────────────────────────────────
    elif etype in ("customer.subscription.created", "customer.subscription.updated"):
        customer_id = obj["customer"]
        user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
        if user:
            _sync_subscription(user, obj)
            db.commit()

    # ── subscription ended ────────────────────────────────────────────────────
    elif etype in ("customer.subscription.deleted", "customer.subscription.paused"):
        customer_id = obj["customer"]
        user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
        if user:
            user.tier                   = TierEnum.free
            user.stripe_subscription_id = None
            user.stripe_period_start    = None
            user.stripe_period_end      = None
            db.commit()

    return {"received": True}
