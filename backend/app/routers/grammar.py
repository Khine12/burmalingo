from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.routers.auth import get_current_user
from app.services import grammar_quota, grammar_service

router = APIRouter()


class GrammarCheckRequest(BaseModel):
    answers: Dict[int, Any]


@router.get("/lessons")
def list_lessons(user: User = Depends(get_current_user)):
    return grammar_service.list_lessons()


@router.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, user: User = Depends(get_current_user)):
    lesson = grammar_service.get_lesson(lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.post("/lessons/{lesson_id}/check")
def check_lesson(
    lesson_id: int,
    payload: GrammarCheckRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    grammar_quota.check_quota(user, db)

    result = grammar_service.grade_lesson(lesson_id, payload.answers)
    if result is None:
        raise HTTPException(status_code=404, detail="Lesson not found")

    score, results = result
    grammar_quota.log_submission(user.id, db)
    return {"score": score, "results": results}
