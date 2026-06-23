from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import ListeningAttempt, ListeningAudio, ListeningLevelEnum, ListeningQuestion, User
from app.routers.auth import get_current_user
from app.schemas.listening import (
    ListeningAttemptResult,
    ListeningAttemptResultItem,
    ListeningAttemptSubmit,
    ListeningAudioDetailOut,
    ListeningAudioOut,
)
from app.services import listening_quota
from app.services.listening_grading import display_answer, grade_answer

router = APIRouter()


@router.get("/audios", response_model=List[ListeningAudioOut])
def list_audios(
    level: Optional[ListeningLevelEnum] = Query(default=None),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(ListeningAudio)
    if level is not None:
        query = query.filter(ListeningAudio.level == level)
    return query.order_by(ListeningAudio.created_at).all()


@router.get("/audios/{audio_id}", response_model=ListeningAudioDetailOut)
def get_audio(
    audio_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    audio = db.query(ListeningAudio).filter(ListeningAudio.id == audio_id).first()
    if not audio:
        raise HTTPException(status_code=404, detail="Listening audio not found")
    return audio


@router.post("/audios/{audio_id}/attempt", response_model=ListeningAttemptResult)
def submit_attempt(
    audio_id: int,
    payload: ListeningAttemptSubmit,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    listening_quota.check_quota(user, db)

    audio = db.query(ListeningAudio).filter(ListeningAudio.id == audio_id).first()
    if not audio:
        raise HTTPException(status_code=404, detail="Listening audio not found")

    questions = (
        db.query(ListeningQuestion)
        .filter(ListeningQuestion.audio_id == audio_id)
        .order_by(ListeningQuestion.order)
        .all()
    )
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found for this audio")

    results = []
    correct_count = 0
    for q in questions:
        user_answer = payload.answers.get(q.id, "")
        is_correct = grade_answer(q.type, user_answer, q.correct_answer)
        if is_correct:
            correct_count += 1
        results.append(
            ListeningAttemptResultItem(
                question_id=q.id,
                is_correct=is_correct,
                correct_answer=display_answer(q.correct_answer),
            )
        )

    score = round(correct_count / len(questions) * 100, 2)

    attempt = ListeningAttempt(
        user_id=user.id,
        audio_id=audio_id,
        answers=payload.answers,
        score=score,
    )
    db.add(attempt)
    db.commit()

    return ListeningAttemptResult(score=score, results=results)
