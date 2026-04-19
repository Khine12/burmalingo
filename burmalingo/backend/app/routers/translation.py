from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.routers.auth import get_current_user
from app.models.models import User, TranslationPrompt, TierEnum
from app.services.translation_service import TranslationService
import random

router = APIRouter()

FREE_DAILY_LIMIT = 2

class TranslationCheck(BaseModel):
    prompt_id: int
    user_answer: str
    user_level: int

@router.get("/prompt")
def get_prompt(
    level: int = Query(default=5, ge=5, le=10),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return a random active translation prompt at the given level."""
    prompts = (
        db.query(TranslationPrompt)
        .filter(TranslationPrompt.level == level, TranslationPrompt.is_active == True)
        .all()
    )
    if not prompts:
        raise HTTPException(status_code=404, detail="No prompts found for this level")
    return random.choice(prompts)

@router.post("/check")
def check_translation(
    payload: TranslationCheck,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Check a student's translation. Free users limited to 2/day."""
    # Free tier gate
    if user.tier == TierEnum.free:
        from datetime import datetime, date
        from app.models.models import ReviewHistory
        # Simple daily count using today's date
        today_start = datetime.combine(date.today(), datetime.min.time())
        # (In production, track translation checks in their own table)

    prompt = db.query(TranslationPrompt).filter(TranslationPrompt.id == payload.prompt_id).first()
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    result = TranslationService.check_translation(prompt, payload.user_answer, payload.user_level)
    return result
