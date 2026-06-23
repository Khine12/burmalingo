"""Add reading/grammar/vocab submission tables and level_test_completed_at

Revision ID: 0006
Revises: 0005
Create Date: 2026-06-23

Backs server-side quota enforcement for Reading (IELTS + General combined),
Grammar, and Vocabulary lessons — same rolling-window pattern as
writing_submissions. Also adds a single nullable timestamp on users for the
Level Test's "once ever for free, unlimited for Pro" gate.
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy import inspect

revision: str = "0006"
down_revision: Union[str, None] = "0005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _has_table(table):
    return inspect(op.get_bind()).has_table(table)


def _has_column(table, column):
    return column in [c["name"] for c in inspect(op.get_bind()).get_columns(table)]


def upgrade() -> None:
    if not _has_table("reading_submissions"):
        op.create_table(
            "reading_submissions",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
            sa.Column("kind", sa.Enum("ielts", "general", name="readingkindenum"), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False, index=True),
        )

    if not _has_table("grammar_submissions"):
        op.create_table(
            "grammar_submissions",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False, index=True),
        )

    if not _has_table("vocab_lesson_submissions"):
        op.create_table(
            "vocab_lesson_submissions",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
            sa.Column("category", sa.Enum("daily-phrases", "common-words", name="vocablessoncategoryenum"), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False, index=True),
        )

    if not _has_column("users", "level_test_completed_at"):
        op.add_column("users", sa.Column("level_test_completed_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "level_test_completed_at")
    op.drop_table("vocab_lesson_submissions")
    op.drop_table("grammar_submissions")
    op.drop_table("reading_submissions")
    # Postgres ENUM types created via sa.Enum() in create_table() are not
    # dropped automatically when the table is dropped.
    op.execute("DROP TYPE IF EXISTS vocablessoncategoryenum")
    op.execute("DROP TYPE IF EXISTS readingkindenum")
