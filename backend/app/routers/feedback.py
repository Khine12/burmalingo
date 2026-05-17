from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from pydantic import BaseModel
from app.database import get_db, Base
from app.config import settings

class Feedback(Base):
    __tablename__ = "feedback"
    id         = Column(Integer, primary_key=True, index=True)
    email      = Column(String, nullable=True)
    message    = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

router = APIRouter()

class FeedbackRequest(BaseModel):
    email: str | None = None
    message: str

@router.post("/submit")
def submit_feedback(payload: FeedbackRequest, db: Session = Depends(get_db)):
    if not payload.message or len(payload.message.strip()) < 5:
        raise HTTPException(status_code=422, detail="Message too short")
    fb = Feedback(email=payload.email, message=payload.message.strip())
    db.add(fb)
    db.commit()
    return {"success": True}

@router.get("/list")
def list_feedback(admin_key: str, db: Session = Depends(get_db)):
    if admin_key != settings.ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")
    items = db.query(Feedback).order_by(Feedback.created_at.desc()).all()
    return [{"id": f.id, "email": f.email, "message": f.message, "created_at": f.created_at} for f in items]
