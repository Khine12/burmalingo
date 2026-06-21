"""Add ielts_preparation value to listeninglevelenum

Revision ID: 0004
Revises: 0003
Create Date: 2026-06-21

Splits Listening into a "General Listening" practice area (the existing
beginner..upper_intermediate levels) and "IELTS Listening" (a new
ielts_preparation level), both backed by the same listening_audios table.
"""
from typing import Sequence, Union

from alembic import op

revision: str = "0004"
down_revision: Union[str, None] = "0003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ALTER TYPE ... ADD VALUE cannot run inside the transaction Alembic
    # normally wraps migrations in, so this needs an autocommit block.
    with op.get_context().autocommit_block():
        op.execute("ALTER TYPE listeninglevelenum ADD VALUE IF NOT EXISTS 'ielts_preparation'")


def downgrade() -> None:
    # Postgres has no "DROP VALUE" for enums; downgrading would require
    # recreating the type. Left as a no-op.
    pass
