"""Add missing user auth columns (is_verified, verification_token, reset_token, reset_token_expires)

Revision ID: 0002
Revises: 0001
Create Date: 2026-06-16

These four columns exist in the SQLAlchemy model but were never added to the
live database via a migration (create_all only creates missing tables, never
alters existing ones).

is_verified defaults to TRUE for existing rows so current users can still log
in after the migration runs. New users created by the application always have
is_verified set explicitly by the Python default (False) or the registration
logic (True in local dev), so the DB-level default only matters for the
backfill of existing rows.
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Existing users are treated as already verified so they can still log in.
    op.add_column(
        "users",
        sa.Column("is_verified", sa.Boolean(), nullable=True, server_default=sa.text("true")),
    )
    op.add_column("users", sa.Column("verification_token", sa.String(), nullable=True))
    op.add_column("users", sa.Column("reset_token",         sa.String(), nullable=True))
    op.add_column(
        "users",
        sa.Column("reset_token_expires", sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("users", "reset_token_expires")
    op.drop_column("users", "reset_token")
    op.drop_column("users", "verification_token")
    op.drop_column("users", "is_verified")
