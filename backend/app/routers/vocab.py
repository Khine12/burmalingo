from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.routers.auth import get_current_user
from app.models.models import User
from app.services.sm2_service import SM2Service
from app.schemas.vocab import ReviewSubmit, ReviewOut, VocabCardOut
from typing import List

router = APIRouter()

@router.get("/due", response_model=List[VocabCardOut])
def get_due_cards(
    level: int = Query(default=5, ge=1, le=10),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return vocab cards due for review today at the given level."""
    due_reviews, new_cards = SM2Service.get_due_cards(user.id, level, db)

    # Combine: due reviews (their card) + new cards
    from app.models.models import VocabCard
    due_card_ids = [r.card_id for r in due_reviews]
    due_cards = db.query(VocabCard).filter(VocabCard.id.in_(due_card_ids)).all()

    return due_cards + new_cards

@router.post("/review", response_model=ReviewOut)
def submit_review(
    payload: ReviewSubmit,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Submit a review rating for a card. SM-2 runs server-side."""
    review = SM2Service.process_review(user.id, payload.card_id, payload.rating, db)
    return review
