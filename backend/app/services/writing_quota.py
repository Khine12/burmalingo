from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import TierEnum, WritingSubmission

WRITING_QUOTA = 3
WRITING_WINDOW_DAYS = 14


def check_quota(user, db: Session) -> int:
    """Verify a free user hasn't exceeded the rolling writing cap.

    Combined across IELTS Writing + General Writing — callers for both
    endpoints share this same check and table. Pro users are unlimited and
    skip the count entirely.

    Window is rolling (now - WRITING_WINDOW_DAYS), computed server-side —
    never the client clock — so it can't be reset by waiting for a calendar
    boundary or spoofed by the browser.

    Returns the current used count (0 for Pro, since it's not metered).

    Raises:
        429 — quota exhausted; detail includes used/limit for the UI
    """
    if user.tier == TierEnum.pro:
        return 0

    window_start = datetime.now(timezone.utc) - timedelta(days=WRITING_WINDOW_DAYS)
    used = (
        db.query(WritingSubmission)
        .filter(
            WritingSubmission.user_id == user.id,
            WritingSubmission.created_at >= window_start,
        )
        .count()
    )

    if used >= WRITING_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": WRITING_QUOTA,
                "window_days": WRITING_WINDOW_DAYS,
            },
        )

    return used


def log_submission(user_id: int, db: Session, kind: str) -> WritingSubmission:
    """Insert a row after grading succeeds, so it counts toward the cap."""
    row = WritingSubmission(user_id=user_id, kind=kind)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
