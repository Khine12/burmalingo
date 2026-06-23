from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.routers.auth import get_current_user
from app.services import vocab_lesson_quota, vocab_lesson_service

router = APIRouter()


class VocabLessonCheckRequest(BaseModel):
    answers: Dict[int, Any]


@router.get("/lessons")
def list_lessons(
    category: Optional[str] = Query(default=None),
    user: User = Depends(get_current_user),
):
    return vocab_lesson_service.list_lessons(category)


@router.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, user: User = Depends(get_current_user)):
    lesson = vocab_lesson_service.get_lesson(lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.post("/lessons/{lesson_id}/check")
def check_lesson(
    lesson_id: int,
    payload: VocabLessonCheckRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    vocab_lesson_quota.check_quota(user, db)

    result = vocab_lesson_service.grade_lesson(lesson_id, payload.answers)
    if result is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    score, results = result
    category = vocab_lesson_service.get_category(lesson_id)
    vocab_lesson_quota.log_submission(user.id, db, category=category)
    return {"score": score, "results": results}
