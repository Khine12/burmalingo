from datetime import datetime
from typing import Dict, List, Optional

from pydantic import BaseModel

from app.models.models import ListeningLevelEnum, ListeningQuestionTypeEnum


class ListeningAudioOut(BaseModel):
    id: int
    title: str
    level: ListeningLevelEnum
    created_at: datetime

    class Config:
        from_attributes = True


class ListeningQuestionOut(BaseModel):
    id: int
    type: ListeningQuestionTypeEnum
    prompt: str
    options: Optional[list] = None
    order: int

    class Config:
        from_attributes = True


class ListeningAudioDetailOut(BaseModel):
    id: int
    title: str
    level: ListeningLevelEnum
    transcript: str
    audio_url: str
    created_at: datetime
    questions: List[ListeningQuestionOut]

    class Config:
        from_attributes = True


class ListeningAttemptSubmit(BaseModel):
    answers: Dict[int, str]


class ListeningAttemptResultItem(BaseModel):
    question_id: int
    is_correct: bool
    correct_answer: str


class ListeningAttemptResult(BaseModel):
    score: float
    results: List[ListeningAttemptResultItem]
