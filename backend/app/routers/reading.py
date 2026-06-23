from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.routers.auth import get_current_user
from app.services import reading_quota, reading_service

router = APIRouter()

KIND = "ielts"


class ReadingCheckRequest(BaseModel):
    answers: Dict[int, Any]


@router.get("/passages")
def list_passages(user: User = Depends(get_current_user)):
    return reading_service.list_passages(KIND)


@router.get("/passages/{passage_id}")
def get_passage(passage_id: int, user: User = Depends(get_current_user)):
    passage = reading_service.get_passage(KIND, passage_id)
    if passage is None:
        raise HTTPException(status_code=404, detail="Passage not found")
    return passage


@router.post("/passages/{passage_id}/check")
def check_passage(
    passage_id: int,
    payload: ReadingCheckRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    reading_quota.check_quota(user, db)

    result = reading_service.grade_passage(KIND, passage_id, payload.answers)
    if result is None:
        raise HTTPException(status_code=404, detail="Passage not found")

    score, results = result
    reading_quota.log_submission(user.id, db, kind=KIND)
    return {"score": score, "results": results}
