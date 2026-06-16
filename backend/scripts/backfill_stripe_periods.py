"""
One-time backfill: populate stripe_subscription_id / stripe_period_start /
stripe_period_end for existing Stripe Pro subscribers so they are not NULL
until their next renewal webhook fires.

Run ONCE immediately after deploying the new columns:

    cd backend
    python scripts/backfill_stripe_periods.py

Safe to re-run: it overwrites with the latest values from Stripe each time.
"""
import os
import sys
from datetime import datetime, timezone

# Allow importing from the backend root regardless of where the script is run from
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import stripe

from app.config import settings
from app.database import SessionLocal
from app.models.models import TierEnum, User

stripe.api_key = settings.STRIPE_SECRET_KEY


def main() -> None:
    if not stripe.api_key:
        print("ERROR: STRIPE_SECRET_KEY is not set. Aborting.")
        sys.exit(1)

    db = SessionLocal()
    try:
        users = (
            db.query(User)
            .filter(User.tier == TierEnum.pro, User.stripe_customer_id.isnot(None))
            .all()
        )
        print(f"Found {len(users)} Stripe Pro user(s) to backfill\n")

        updated = 0
        skipped = 0

        for user in users:
            try:
                result = stripe.Subscription.list(
                    customer=user.stripe_customer_id,
                    status="active",
                    limit=1,
                )

                if not result.data:
                    # Try trialing subscriptions too
                    result = stripe.Subscription.list(
                        customer=user.stripe_customer_id,
                        status="trialing",
                        limit=1,
                    )

                if not result.data:
                    print(f"  SKIP  {user.email}: no active or trialing subscription found")
                    skipped += 1
                    continue

                sub  = result.data[0]
                item = sub.items.data[0]

                user.stripe_subscription_id = sub.id
                user.stripe_period_start = datetime.fromtimestamp(
                    item.current_period_start, tz=timezone.utc
                )
                user.stripe_period_end = datetime.fromtimestamp(
                    item.current_period_end, tz=timezone.utc
                )
                updated += 1
                print(
                    f"  OK    {user.email}  sub={sub.id}\n"
                    f"        period {user.stripe_period_start.date()} → {user.stripe_period_end.date()}"
                )

            except stripe.error.StripeError as exc:
                print(f"  ERROR {user.email}: {exc}")
                skipped += 1

        db.commit()
        print(f"\nDone — {updated} updated, {skipped} skipped.")

    finally:
        db.close()


if __name__ == "__main__":
    main()
