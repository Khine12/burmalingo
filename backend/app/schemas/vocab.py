from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class VocabCardOut(BaseModel):
    id: int
    english: str
    pos: str
    definition: str
    example: str
    level: int

    class Config:
        from_attributes = True

class ReviewSubmit(BaseModel):
    card_id: int
    rating: Literal["hard", "good", "easy"]

class ReviewOut(BaseModel):
    card_id: int
    rating: str
    interval_days: int
    easiness_factor: float
    next_review_at: datetime

    class Config:
        from_attributes = True
