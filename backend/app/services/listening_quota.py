from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import ListeningAttempt, TierEnum

LISTENING_QUOTA = 1
LISTENING_WINDOW_DAYS = 7


def check_quota(user, db: Session) -> int:
    """Verify a free user hasn't exceeded the rolling listening cap.

    Reuses the existing ListeningAttempt rows — no separate log step needed,
    since the router already inserts one per submitted attempt. Pro users
    are unlimited and skip the count entirely.

    Window is rolling (now - LISTENING_WINDOW_DAYS), computed server-side —
    never the client clock.

    Returns the current used count (0 for Pro, since it's not metered).

    Raises:
        429 — quota exhausted; detail includes used/limit for the UI
    """
    if user.tier == TierEnum.pro:
        return 0

    window_start = datetime.now(timezone.utc) - timedelta(days=LISTENING_WINDOW_DAYS)
    used = (
        db.query(ListeningAttempt)
        .filter(
            ListeningAttempt.user_id == user.id,
            ListeningAttempt.created_at >= window_start,
        )
        .count()
    )

    if used >= LISTENING_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": LISTENING_QUOTA,
                "window_days": LISTENING_WINDOW_DAYS,
            },
        )

    return used
