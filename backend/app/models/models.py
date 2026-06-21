from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class TierEnum(str, enum.Enum):
    free = "free"
    pro = "pro"

class ListeningQuestionTypeEnum(str, enum.Enum):
    fill_blank = "fill_blank"
    true_false = "true_false"
    mcq = "mcq"

class ListeningLevelEnum(str, enum.Enum):
    beginner = "beginner"
    elementary = "elementary"
    pre_intermediate = "pre_intermediate"
    intermediate = "intermediate"
    upper_intermediate = "upper_intermediate"

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
    stripe_customer_id      = Column(String, nullable=True)
    stripe_subscription_id  = Column(String, nullable=True)
    stripe_period_start     = Column(DateTime(timezone=True), nullable=True)
    stripe_period_end       = Column(DateTime(timezone=True), nullable=True)
    manual_period_start     = Column(DateTime(timezone=True), nullable=True)
    manual_period_end       = Column(DateTime(timezone=True), nullable=True)
    is_verified         = Column(Boolean, default=False)
    verification_token  = Column(String, nullable=True)
    reset_token         = Column(String, nullable=True)
    reset_token_expires = Column(DateTime(timezone=True), nullable=True)
    created_at          = Column(DateTime(timezone=True), server_default=func.now())

    reviews              = relationship("ReviewHistory", back_populates="user")
    speaking_assessments = relationship("SpeakingAssessment", back_populates="user")
    listening_attempts   = relationship("ListeningAttempt", back_populates="user")

class VocabCard(Base):
    __tablename__ = "vocab_cards"

    id         = Column(Integer, primary_key=True, index=True)
    english    = Column(String, nullable=False)
    pos        = Column(String)
    definition = Column(String, nullable=False)
    example    = Column(String)
    level      = Column(Integer, nullable=False)

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

class SpeakingAssessment(Base):
    __tablename__ = "speaking_assessments"

    id                  = Column(Integer, primary_key=True, index=True)
    user_id             = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    scored_at           = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    prompt_text         = Column(Text, nullable=True)
    transcript          = Column(Text, nullable=True)
    pronunciation_score = Column(Float, nullable=True)
    accuracy_score      = Column(Float, nullable=True)
    fluency_score       = Column(Float, nullable=True)
    completeness_score  = Column(Float, nullable=True)
    prosody_score       = Column(Float, nullable=True)
    overall_score       = Column(Float, nullable=True)

    user = relationship("User", back_populates="speaking_assessments")

class ListeningAudio(Base):
    __tablename__ = "listening_audios"

    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String, nullable=False)
    level      = Column(Enum(ListeningLevelEnum), nullable=False)
    transcript = Column(Text, nullable=False)
    audio_url  = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    questions = relationship("ListeningQuestion", back_populates="audio", order_by="ListeningQuestion.order")

class ListeningQuestion(Base):
    __tablename__ = "listening_questions"

    id             = Column(Integer, primary_key=True, index=True)
    audio_id       = Column(Integer, ForeignKey("listening_audios.id"), nullable=False, index=True)
    type           = Column(Enum(ListeningQuestionTypeEnum), nullable=False)
    prompt         = Column(Text, nullable=False)
    options        = Column(JSON, nullable=True)
    # Pipe-separated ('|') list of accepted answers, e.g. "blueberry|blueberries".
    # fill_blank matches any variant after normalization; mcq/true_false store a
    # single value with no pipe.
    correct_answer = Column(String, nullable=False)
    order          = Column(Integer, nullable=False)

    audio = relationship("ListeningAudio", back_populates="questions")

class ListeningAttempt(Base):
    __tablename__ = "listening_attempts"

    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    audio_id   = Column(Integer, ForeignKey("listening_audios.id"), nullable=False, index=True)
    answers    = Column(JSON, nullable=False)
    score      = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user  = relationship("User", back_populates="listening_attempts")
    audio = relationship("ListeningAudio")
