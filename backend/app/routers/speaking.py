from datetime import datetime, timezone

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import SpeakingAssessment, TierEnum, User
from app.routers.auth import get_current_user
from app.services.azure_speech import score_pronunciation
from app.services.speaking_quota import (
    SPEAKING_QUOTA,
    check_quota,
    get_current_period,
    log_assessment,
)

router = APIRouter()

_MAX_AUDIO_BYTES = 10 * 1024 * 1024  # 10 MB


@router.get("/quota")
def get_quota(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Return the user's current speaking assessment quota status.

    Response shapes:
      { is_pro: false }                          — free user
      { is_pro: true, subscription_expired: true, period_end }  — manual sub lapsed
      { is_pro: true, used, limit, period_end }  — active Pro
    """
    if user.tier != TierEnum.pro:
        return {"is_pro": False, "limit": SPEAKING_QUOTA}

    # Manual subscriber expiry — mirrors the check in check_quota so the UI
    # can show "Subscription expired" before the user even tries to record.
    if user.manual_period_end is not None:
        if datetime.now(timezone.utc) > user.manual_period_end:
            return {
                "is_pro": True,
                "subscription_expired": True,
                "period_end": user.manual_period_end.isoformat(),
                "limit": SPEAKING_QUOTA,
            }

    period_start, period_end = get_current_period(user)

    if period_start is None:
        # Period not yet synced (backfill pending or brand-new Stripe subscriber).
        return {
            "is_pro": True,
            "used": 0,
            "limit": SPEAKING_QUOTA,
            "period_end": None,
        }

    used = (
        db.query(SpeakingAssessment)
        .filter(
            SpeakingAssessment.user_id == user.id,
            SpeakingAssessment.scored_at >= period_start,
        )
        .count()
    )

    return {
        "is_pro": True,
        "used": used,
        "limit": SPEAKING_QUOTA,
        "period_end": period_end.isoformat() if period_end else None,
    }


@router.post("/assess")
async def assess_pronunciation(
    audio: UploadFile = File(..., description="Audio of the user's spoken response (webm, mp4, wav)"),
    prompt_text: str = Form(..., description="The reference text the user was asked to read"),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Score a speaking assessment via Azure Cognitive Services.

    Accepts any format the browser sends (webm/opus, mp4/aac, wav) — ffmpeg
    converts to 16 kHz mono PCM before Azure receives it.

    Only scored attempts count toward the 15/period quota.
    Quota is checked BEFORE calling Azure so we never burn an API call
    on a user who is already over their limit or has a lapsed subscription.
    """
    # ── 1. quota / expiry gate (raises 402, 403, or 429) ─────────────────────
    used_before, period_end = check_quota(user, db)

    # ── 2. read and size-check the upload ────────────────────────────────────
    audio_bytes = await audio.read()
    print(f"[speaking] received audio content_type={audio.content_type} size={len(audio_bytes)}", flush=True)
    if not audio_bytes:
        raise HTTPException(status_code=422, detail="Audio file is empty")
    if len(audio_bytes) > _MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Audio file exceeds 10 MB limit")

    # ── 3. convert + score via Azure (raises 422/502/503 on failure) ─────────
    scores = score_pronunciation(audio_bytes, prompt_text)

    # ── 4. log the attempt now that Azure succeeded ───────────────────────────
    row = log_assessment(
        user_id=user.id,
        db=db,
        prompt_text=prompt_text,
        **scores,
    )

    return {
        **scores,
        "scored_at": row.scored_at.isoformat(),
        "quota": {
            "used": used_before + 1,
            "limit": SPEAKING_QUOTA,
            "period_end": period_end.isoformat() if period_end else None,
        },
    }
