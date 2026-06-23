from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import GrammarSubmission, TierEnum

GRAMMAR_QUOTA = 1
GRAMMAR_WINDOW_DAYS = 7


def check_quota(user, db: Session) -> int:
    """Verify a free user hasn't exceeded the rolling grammar cap.

    Pro users are unlimited and skip the count entirely. Window is rolling
    (now - GRAMMAR_WINDOW_DAYS), computed server-side — never the client
    clock.

    Returns the current used count (0 for Pro, since it's not metered).

    Raises:
        429 — quota exhausted; detail includes used/limit for the UI
    """
    if user.tier == TierEnum.pro:
        return 0

    window_start = datetime.now(timezone.utc) - timedelta(days=GRAMMAR_WINDOW_DAYS)
    used = (
        db.query(GrammarSubmission)
        .filter(
            GrammarSubmission.user_id == user.id,
            GrammarSubmission.created_at >= window_start,
        )
        .count()
    )

    if used >= GRAMMAR_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": GRAMMAR_QUOTA,
                "window_days": GRAMMAR_WINDOW_DAYS,
            },
        )

    return used


def log_submission(user_id: int, db: Session) -> GrammarSubmission:
    """Insert a row after grading succeeds, so it counts toward the cap."""
    row = GrammarSubmission(user_id=user_id)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
