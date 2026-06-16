from datetime import datetime, timezone
from typing import Optional

from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User, TierEnum
from app.config import settings

router = APIRouter()


class VerifyRequest(BaseModel):
    email: str
    admin_key: str


class UpgradeRequest(BaseModel):
    email: str
    admin_key: str
    # ISO-8601 string, e.g. "2026-06-01T00:00:00Z". Defaults to now() if omitted.
    activation_date: Optional[str] = None


class DowngradeRequest(BaseModel):
    email: str
    admin_key: str


class RenewRequest(BaseModel):
    email: str
    admin_key: str


@router.post("/verify-user")
def force_verify_user(payload: VerifyRequest, db: Session = Depends(get_db)):
    """Manually mark a user's email as verified. Use when the verification link
    fails (e.g. cross-environment token mismatch in local dev)."""
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_verified = True
    user.verification_token = None
    db.commit()
    return {"success": True, "email": user.email, "is_verified": user.is_verified}


@router.post("/upgrade")
def upgrade_user(payload: UpgradeRequest, db: Session = Depends(get_db)):
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if payload.activation_date:
        activation = datetime.fromisoformat(payload.activation_date.replace("Z", "+00:00"))
        if activation.tzinfo is None:
            activation = activation.replace(tzinfo=timezone.utc)
    else:
        activation = datetime.now(timezone.utc)

    user.tier               = TierEnum.pro
    user.manual_period_start = activation
    user.manual_period_end   = activation + relativedelta(months=+1)
    db.commit()

    return {
        "success": True,
        "email": user.email,
        "tier": user.tier,
        "manual_period_start": user.manual_period_start.isoformat(),
        "manual_period_end":   user.manual_period_end.isoformat(),
    }


@router.post("/downgrade")
def downgrade_user(payload: DowngradeRequest, db: Session = Depends(get_db)):
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.tier                = TierEnum.free
    user.manual_period_start = None
    user.manual_period_end   = None
    db.commit()

    return {"success": True, "email": user.email, "tier": user.tier}


@router.post("/renew")
def renew_user(payload: RenewRequest, db: Session = Depends(get_db)):
    """Roll a manual subscriber's billing period forward by one month from today."""
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.tier != TierEnum.pro:
        raise HTTPException(status_code=400, detail="User is not Pro")

    now = datetime.now(timezone.utc)
    user.manual_period_start = now
    user.manual_period_end   = now + relativedelta(months=+1)
    db.commit()

    return {
        "success": True,
        "email": user.email,
        "manual_period_start": user.manual_period_start.isoformat(),
        "manual_period_end":   user.manual_period_end.isoformat(),
    }


@router.get("/users")
def list_users(admin_key: str, db: Session = Depends(get_db)):
    if admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "tier": u.tier,
            "stripe_customer_id":     u.stripe_customer_id,
            "stripe_subscription_id": u.stripe_subscription_id,
            "stripe_period_start":    u.stripe_period_start.isoformat() if u.stripe_period_start else None,
            "stripe_period_end":      u.stripe_period_end.isoformat()   if u.stripe_period_end   else None,
            "manual_period_start":    u.manual_period_start.isoformat()  if u.manual_period_start  else None,
            "manual_period_end":      u.manual_period_end.isoformat()    if u.manual_period_end    else None,
            "created_at": u.created_at,
        }
        for u in users
    ]
