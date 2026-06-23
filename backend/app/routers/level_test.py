from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import TierEnum, User
from app.routers.auth import get_current_user
from app.services import level_test_quota

router = APIRouter()


@router.get("/eligibility")
def get_eligibility(user: User = Depends(get_current_user)):
    """Tells the frontend whether to show the test or the locked card,
    without raising — this is a status check, not a gate."""
    if user.tier == TierEnum.pro:
        return {"can_take": True}
    return {"can_take": user.level_test_completed_at is None}


@router.post("/complete")
def complete(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Called once the test finishes. Re-checks eligibility server-side
    before recording, so a free user can't mark themselves complete twice
    by racing the eligibility check."""
    level_test_quota.mark_completed(user, db)
    return {"success": True}
