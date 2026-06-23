from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import TierEnum, VocabLessonSubmission

VOCAB_LESSON_QUOTA = 1
VOCAB_LESSON_WINDOW_DAYS = 7


def check_quota(user, db: Session) -> int:
    """Verify a free user hasn't exceeded the rolling vocabulary-lesson cap.

    Combined across both categories (Daily Phrases + Common Words) — the
    pricing table treats "Vocabulary & Phrases" as one pool, not one per
    category. Pro users are unlimited and skip the count entirely.

    Window is rolling (now - VOCAB_LESSON_WINDOW_DAYS), computed server-side
    — never the client clock.

    Returns the current used count (0 for Pro, since it's not metered).

    Raises:
        429 — quota exhausted; detail includes used/limit for the UI
    """
    if user.tier == TierEnum.pro:
        return 0

    window_start = datetime.now(timezone.utc) - timedelta(days=VOCAB_LESSON_WINDOW_DAYS)
    used = (
        db.query(VocabLessonSubmission)
        .filter(
            VocabLessonSubmission.user_id == user.id,
            VocabLessonSubmission.created_at >= window_start,
        )
        .count()
    )

    if used >= VOCAB_LESSON_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": VOCAB_LESSON_QUOTA,
                "window_days": VOCAB_LESSON_WINDOW_DAYS,
            },
        )

    return used


def log_submission(user_id: int, db: Session, category: str) -> VocabLessonSubmission:
    """Insert a row after grading succeeds, so it counts toward the cap."""
    row = VocabLessonSubmission(user_id=user_id, category=category)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
