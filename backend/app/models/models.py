from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class TierEnum(str, enum.Enum):
    free = "free"
    pro = "pro"

class RatingEnum(str, enum.Enum):
    hard = "hard"
    good = "good"
    easy = "easy"

class User(Base):
    __tablename__ = "users"

    id              = Column(Integer, primary_key=True, index=True)
    email           = Column(String, unique=True, index=True, nullable=False)
    name            = Column(String, nullable=False, server_default="")
    hashed_password = Column(String, nullable=False)
    tier            = Column(Enum(TierEnum), default=TierEnum.free)
    current_level   = Column(Integer, default=5)
    stripe_customer_id = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True)
    reset_token = Column(String, nullable=True)
    reset_token_expires = Column(DateTime(timezone=True), nullable=True)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())

    reviews         = relationship("ReviewHistory", back_populates="user")

class VocabCard(Base):
    __tablename__ = "vocab_cards"

    id         = Column(Integer, primary_key=True, index=True)
    english    = Column(String, nullable=False)
    pos        = Column(String)                      # part of speech
    definition = Column(String, nullable=False)
    example    = Column(String)
    level      = Column(Integer, nullable=False)     # 1-10

class ReviewHistory(Base):
    __tablename__ = "review_history"

    id                = Column(Integer, primary_key=True, index=True)
    user_id           = Column(Integer, ForeignKey("users.id"), nullable=False)
    card_id           = Column(Integer, ForeignKey("vocab_cards.id"), nullable=False)
    rating            = Column(Enum(RatingEnum), nullable=False)
    easiness_factor   = Column(Float, default=2.5)
    interval_days     = Column(Integer, default=1)
    repetitions       = Column(Integer, default=0)
    next_review_at    = Column(DateTime(timezone=True))
    reviewed_at       = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="reviews")

class TranslationPrompt(Base):
    __tablename__ = "translation_prompts"

    id           = Column(Integer, primary_key=True, index=True)
    burmese      = Column(String, nullable=False)
    hint         = Column(String)
    model_answer = Column(String, nullable=False)
    level        = Column(Integer, nullable=False)
    is_active    = Column(Boolean, default=True)
