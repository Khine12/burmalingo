from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.routers.auth import get_current_user
from app.models.models import User, ReviewHistory, VocabCard

router = APIRouter()

@router.get("/")
def get_progress(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Return user progress stats for the dashboard."""

    # Total unique cards reviewed
    words_known = (
        db.query(func.count(func.distinct(ReviewHistory.card_id)))
        .filter(ReviewHistory.user_id == user.id, ReviewHistory.repetitions >= 2)
        .scalar() or 0
    )

    # Average easiness factor as proxy for retention
    avg_ef = (
        db.query(func.avg(ReviewHistory.easiness_factor))
        .filter(ReviewHistory.user_id == user.id)
        .scalar() or 2.5
    )
    retention_rate = min(100, round((avg_ef / 3.5) * 100))

    # Cards reviewed per level
    level_counts = (
        db.query(VocabCard.level, func.count(ReviewHistory.id))
        .join(ReviewHistory, ReviewHistory.card_id == VocabCard.id)
        .filter(ReviewHistory.user_id == user.id)
        .group_by(VocabCard.level)
        .all()
    )

    # Total cards per level for completion %
    total_per_level = (
        db.query(VocabCard.level, func.count(VocabCard.id))
        .group_by(VocabCard.level)
        .all()
    )
    totals = {level: count for level, count in total_per_level}
    level_completion = {
        level: round((reviewed / totals.get(level, 1)) * 100)
        for level, reviewed in level_counts
    }

    return {
        "words_known": words_known,
        "current_level": user.current_level,
        "retention_rate": retention_rate,
        "level_completion": level_completion,
        "tier": user.tier,
    }
