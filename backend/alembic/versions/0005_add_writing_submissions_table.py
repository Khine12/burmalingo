"""Add writing_submissions table

Revision ID: 0005
Revises: 0004
Create Date: 2026-06-22

Backs server-side quota enforcement for IELTS + General Writing combined:
one row per graded submission, counted against a rolling 14-day window.
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy import inspect

revision: str = "0005"
down_revision: Union[str, None] = "0004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _has_table(table):
    return inspect(op.get_bind()).has_table(table)


def upgrade() -> None:
    if not _has_table("writing_submissions"):
        op.create_table(
            "writing_submissions",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
            sa.Column(
                "kind",
                sa.Enum("ielts", "general", name="writingkindenum"),
                nullable=False,
            ),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False, index=True),
        )


def downgrade() -> None:
    op.drop_table("writing_submissions")
    # Postgres ENUM types created via sa.Enum() in create_table() are not
    # dropped automatically when the table is dropped.
    op.execute("DROP TYPE IF EXISTS writingkindenum")
