"""Add listening feature tables (listening_audios, listening_questions, listening_attempts)

Revision ID: 0003
Revises: 0002
Create Date: 2026-06-21

Adds the tables backing the IELTS-style Listening feature: an audio lesson
with its transcript and audio URL, the questions attached to each lesson,
and a record of each user's graded attempt.
"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy import inspect

revision: str = "0003"
down_revision: Union[str, None] = "0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _has_table(table):
    return inspect(op.get_bind()).has_table(table)


def upgrade() -> None:
    # Guarded so this migration is safe to re-run against a database that
    # already has some or all of these tables.
    if not _has_table("listening_audios"):
        op.create_table(
            "listening_audios",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("title", sa.String(), nullable=False),
            sa.Column(
                "level",
                sa.Enum(
                    "beginner", "elementary", "pre_intermediate", "intermediate", "upper_intermediate",
                    name="listeninglevelenum",
                ),
                nullable=False,
            ),
            sa.Column("transcript", sa.Text(), nullable=False),
            sa.Column("audio_url", sa.String(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        )

    if not _has_table("listening_questions"):
        op.create_table(
            "listening_questions",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("audio_id", sa.Integer(), sa.ForeignKey("listening_audios.id"), nullable=False, index=True),
            sa.Column(
                "type",
                sa.Enum("fill_blank", "true_false", "mcq", name="listeningquestiontypeenum"),
                nullable=False,
            ),
            sa.Column("prompt", sa.Text(), nullable=False),
            sa.Column("options", sa.JSON(), nullable=True),
            sa.Column("correct_answer", sa.String(), nullable=False),
            sa.Column("order", sa.Integer(), nullable=False),
        )

    if not _has_table("listening_attempts"):
        op.create_table(
            "listening_attempts",
            sa.Column("id", sa.Integer(), primary_key=True, index=True),
            sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False, index=True),
            sa.Column("audio_id", sa.Integer(), sa.ForeignKey("listening_audios.id"), nullable=False, index=True),
            sa.Column("answers", sa.JSON(), nullable=False),
            sa.Column("score", sa.Float(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
        )


def downgrade() -> None:
    op.drop_table("listening_attempts")
    op.drop_table("listening_questions")
    op.drop_table("listening_audios")
    # Postgres ENUM types created via sa.Enum() in create_table() are not
    # dropped automatically when the table is dropped.
    op.execute("DROP TYPE IF EXISTS listeningquestiontypeenum")
    op.execute("DROP TYPE IF EXISTS listeninglevelenum")
