from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import ReadingSubmission, TierEnum

READING_QUOTA = 3
READING_WINDOW_DAYS = 14


def check_quota(user, db: Session) -> int:
    """Verify a free user hasn't exceeded the rolling reading cap.

    Combined across IELTS Reading + General Reading — callers for both
    endpoints share this same check and table, separate from the writing
    cap (the pricing table treats Writing and Reading as two independent
    3-per-2-week pools, not a shared one). Pro users are unlimited and skip
    the count entirely.

    Window is rolling (now - READING_WINDOW_DAYS), computed server-side —
    never the client clock.

    Returns the current used count (0 for Pro, since it's not metered).

    Raises:
        429 — quota exhausted; detail includes used/limit for the UI
    """
    if user.tier == TierEnum.pro:
        return 0

    window_start = datetime.now(timezone.utc) - timedelta(days=READING_WINDOW_DAYS)
    used = (
        db.query(ReadingSubmission)
        .filter(
            ReadingSubmission.user_id == user.id,
            ReadingSubmission.created_at >= window_start,
        )
        .count()
    )

    if used >= READING_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": READING_QUOTA,
                "window_days": READING_WINDOW_DAYS,
            },
        )

    return used


def log_submission(user_id: int, db: Session, kind: str) -> ReadingSubmission:
    """Insert a row after grading succeeds, so it counts toward the cap."""
    row = ReadingSubmission(user_id=user_id, kind=kind)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
