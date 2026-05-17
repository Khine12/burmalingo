from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models.models import User, TierEnum
from app.config import settings

router = APIRouter()

class UpgradeRequest(BaseModel):
    email: str
    admin_key: str

class DowngradeRequest(BaseModel):
    email: str
    admin_key: str

@router.post("/upgrade")
def upgrade_user(payload: UpgradeRequest, db: Session = Depends(get_db)):
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.tier = TierEnum.pro
    db.commit()
    return {"success": True, "email": user.email, "tier": user.tier}

@router.post("/downgrade")
def downgrade_user(payload: DowngradeRequest, db: Session = Depends(get_db)):
    if payload.admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.tier = TierEnum.free
    db.commit()
    return {"success": True, "email": user.email, "tier": user.tier}

@router.get("/users")
def list_users(admin_key: str, db: Session = Depends(get_db)):
    if admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    users = db.query(User).all()
    return [{"id": u.id, "email": u.email, "tier": u.tier, "created_at": u.created_at} for u in users]
