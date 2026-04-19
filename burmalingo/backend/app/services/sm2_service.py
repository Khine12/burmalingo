from datetime import datetime, timedelta
from app.models.models import ReviewHistory, VocabCard
from sqlalchemy.orm import Session

QUALITY = {"hard": 2, "good": 4, "easy": 5}
MIN_EF = 1.3
INITIAL_EF = 2.5

class SM2Service:

    @staticmethod
    def get_due_cards(user_id: int, level: int, db: Session, limit: int = 20):
        """Get cards due for review today at the given level."""
        now = datetime.utcnow()

        # Cards already reviewed — get ones due today
        reviewed_ids_subq = (
            db.query(ReviewHistory.card_id)
            .filter(ReviewHistory.user_id == user_id)
            .subquery()
        )

        due_reviews = (
            db.query(ReviewHistory)
            .filter(
                ReviewHistory.user_id == user_id,
                ReviewHistory.next_review_at <= now,
            )
            .all()
        )

        # New cards the user hasn't seen yet at this level
        new_cards = (
            db.query(VocabCard)
            .filter(
                VocabCard.level == level,
                ~VocabCard.id.in_(reviewed_ids_subq),
            )
            .limit(max(0, limit - len(due_reviews)))
            .all()
        )

        return due_reviews, new_cards

    @staticmethod
    def process_review(user_id: int, card_id: int, rating: str, db: Session) -> ReviewHistory:
        """Apply SM-2 and save the result."""
        existing = (
            db.query(ReviewHistory)
            .filter(ReviewHistory.user_id == user_id, ReviewHistory.card_id == card_id)
            .first()
        )

        q = QUALITY[rating]
        ef = existing.easiness_factor if existing else INITIAL_EF
        reps = existing.repetitions if existing else 0
        interval = existing.interval_days if existing else 1

        # SM-2 easiness factor update
        new_ef = max(MIN_EF, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))

        # SM-2 interval calculation
        if q < 3:
            new_interval = 1
            new_reps = 0
        else:
            new_reps = reps + 1
            if reps == 0:
                new_interval = 1
            elif reps == 1:
                new_interval = 6
            else:
                new_interval = round(interval * new_ef)

        next_review = datetime.utcnow() + timedelta(days=new_interval)

        if existing:
            existing.rating = rating
            existing.easiness_factor = new_ef
            existing.interval_days = new_interval
            existing.repetitions = new_reps
            existing.next_review_at = next_review
            existing.reviewed_at = datetime.utcnow()
            db.commit()
            db.refresh(existing)
            return existing
        else:
            review = ReviewHistory(
                user_id=user_id,
                card_id=card_id,
                rating=rating,
                easiness_factor=new_ef,
                interval_days=new_interval,
                repetitions=new_reps,
                next_review_at=next_review,
            )
            db.add(review)
            db.commit()
            db.refresh(review)
            return review
