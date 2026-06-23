from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import TierEnum, User


def check_eligibility(user: User) -> None:
    """Verify a free user hasn't already taken the level test.

    Unlike the rolling-window quotas, this is a once-ever gate for free
    users, tracked on User.level_test_completed_at rather than a usage
    table. Pro users can always retake.

    Raises:
        429 — quota_exceeded; same shape the frontend's isQuotaExceededError()
        already detects, so it reuses the existing "Free Limit Reached" card.
    """
    if user.tier == TierEnum.pro:
        return
    if user.level_test_completed_at is not None:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": 1,
                "limit": 1,
                "completed_at": user.level_test_completed_at.isoformat(),
            },
        )


def mark_completed(user: User, db: Session) -> None:
    """Record completion after a successful attempt. Re-checks eligibility
    first so a free user can't double-submit past the gate."""
    check_eligibility(user)
    user.level_test_completed_at = datetime.now(timezone.utc)
    db.commit()
