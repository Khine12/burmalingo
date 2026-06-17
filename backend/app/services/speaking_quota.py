from datetime import datetime, timezone
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.models import SpeakingAssessment, TierEnum

SPEAKING_QUOTA = 25


def get_current_period(user) -> tuple[Optional[datetime], Optional[datetime]]:
    """Return (period_start, period_end) for the user's current billing period.

    Stripe subscribers take precedence; manual subscribers fall back.
    Returns (None, None) if the user has no period synced yet.

    NOTE: does NOT check whether a manual period is expired — callers that need
    to block on expiry must do so explicitly (check_quota does this).
    """
    if user.stripe_period_start and user.stripe_period_end:
        return user.stripe_period_start, user.stripe_period_end
    if user.manual_period_start and user.manual_period_end:
        return user.manual_period_start, user.manual_period_end
    return None, None


def check_quota(user, db: Session) -> tuple[int, Optional[datetime]]:
    """Verify the user is Pro, not expired, and has quota remaining.

    Returns (used_count, period_end) so the caller can include it in
    the response payload.

    Raises:
        403 — user is not Pro
        402 — manual subscriber whose period_end is in the past
        429 — quota exhausted; detail includes period_end for the UI
    """
    if user.tier != TierEnum.pro:
        raise HTTPException(
            status_code=403,
            detail="Speaking assessments require a Pro subscription",
        )

    # ── Manual subscriber expiry check ───────────────────────────────────────
    # Stripe expiry is handled by the subscription.deleted webhook (tier → free).
    # Manual subscribers stay Pro in the DB until an admin downgrades them, so
    # we must enforce the period boundary here.
    if user.manual_period_end is not None:
        if datetime.now(timezone.utc) > user.manual_period_end:
            raise HTTPException(
                status_code=402,
                detail={
                    "error": "subscription_expired",
                    "period_end": user.manual_period_end.isoformat(),
                },
            )

    period_start, period_end = get_current_period(user)

    if period_start is None:
        # Pro user whose period hasn't synced yet (new signup or pre-backfill).
        # Be permissive — don't count against an unknown window.
        return 0, None

    used = (
        db.query(SpeakingAssessment)
        .filter(
            SpeakingAssessment.user_id == user.id,
            SpeakingAssessment.scored_at >= period_start,
        )
        .count()
    )

    if used >= SPEAKING_QUOTA:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "quota_exceeded",
                "used": used,
                "limit": SPEAKING_QUOTA,
                "period_end": period_end.isoformat() if period_end else None,
            },
        )

    return used, period_end


def log_assessment(user_id: int, db: Session, **scores) -> SpeakingAssessment:
    """Insert a scored assessment row after Azure succeeds."""
    row = SpeakingAssessment(user_id=user_id, **scores)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
