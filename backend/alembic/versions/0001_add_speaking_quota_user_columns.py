"""Add speaking quota columns to users table

Revision ID: 0001
Revises:
Create Date: 2026-06-16

Adds five nullable columns to the existing `users` table to support the
monthly speaking-assessment quota for both Stripe and manually-activated users.
The new `speaking_assessments` table is handled by SQLAlchemy's create_all on
startup and does NOT need to be in this migration.

After applying: run scripts/backfill_stripe_periods.py to populate period
fields for existing Stripe Pro subscribers.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _has_column(table, col):
    return col in [c["name"] for c in inspect(op.get_bind()).get_columns(table)]


def _has_table(table):
    return inspect(op.get_bind()).has_table(table)


def upgrade() -> None:
    # Guarded so this migration is safe to run against a database (e.g. Neon
    # production) that already has some or all of these columns from before
    # Alembic was introduced.
    if not _has_column("users", "stripe_subscription_id"):
        op.add_column("users", sa.Column("stripe_subscription_id", sa.String(), nullable=True))
    if not _has_column("users", "stripe_period_start"):
        op.add_column("users", sa.Column("stripe_period_start", sa.DateTime(timezone=True), nullable=True))
    if not _has_column("users", "stripe_period_end"):
        op.add_column("users", sa.Column("stripe_period_end",   sa.DateTime(timezone=True), nullable=True))
    if not _has_column("users", "manual_period_start"):
        op.add_column("users", sa.Column("manual_period_start", sa.DateTime(timezone=True), nullable=True))
    if not _has_column("users", "manual_period_end"):
        op.add_column("users", sa.Column("manual_period_end",   sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "manual_period_end")
    op.drop_column("users", "manual_period_start")
    op.drop_column("users", "stripe_period_end")
    op.drop_column("users", "stripe_period_start")
    op.drop_column("users", "stripe_subscription_id")
