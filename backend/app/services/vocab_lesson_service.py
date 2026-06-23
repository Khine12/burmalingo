import json
import os
from typing import Optional

from app.services.quiz_grading import grade as grade_questions

_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

with open(os.path.join(_DATA_DIR, "vocab_lessons.json"), encoding="utf-8") as f:
    _LESSONS: list[dict] = json.load(f)


def _sanitize_question(q: dict) -> dict:
    # explanation is stripped too — most explanations restate the correct
    # answer outright, so it can't ship before the user has answered. It's
    # returned by the per-question /answer and lesson /check endpoints
    # instead, once grading has actually happened.
    return {k: v for k, v in q.items() if k not in ("answer", "alternatives", "explanation")}


def _find(lesson_id: int) -> dict | None:
    for l in _LESSONS:
        if l["id"] == lesson_id:
            return l
    return None


def list_lessons(category: Optional[str] = None) -> list[dict]:
    """Lightweight list view — omits question content."""
    lessons = _LESSONS if category is None else [l for l in _LESSONS if l["category"] == category]
    return [
        {
            "id": l["id"],
            "category": l["category"],
            "topic": l["topic"],
            "title": l["title"],
            "question_count": len(l["questions"]),
        }
        for l in lessons
    ]


def get_lesson(lesson_id: int) -> dict | None:
    l = _find(lesson_id)
    if l is None:
        return None
    return {**l, "questions": [_sanitize_question(q) for q in l["questions"]]}


def grade_lesson(lesson_id: int, answers: dict[int, object]):
    l = _find(lesson_id)
    if l is None:
        return None
    return grade_questions(l["questions"], answers)


def get_question(lesson_id: int, question_id: int) -> Optional[dict]:
    """Raw (un-sanitized) question, for the per-question immediate-feedback
    endpoint — vocab lessons reveal correctness one question at a time,
    unlike Reading's single end-of-passage submission."""
    l = _find(lesson_id)
    if l is None:
        return None
    for q in l["questions"]:
        if q["id"] == question_id:
            return q
    return None


def get_category(lesson_id: int) -> Optional[str]:
    """Looked up server-side after grading, rather than trusting a
    client-supplied category, since the quota log must reflect the real
    lesson regardless of what the request body claims."""
    l = _find(lesson_id)
    return l["category"] if l else None
