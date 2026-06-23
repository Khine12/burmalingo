import json
import os

from app.services.quiz_grading import grade as grade_questions

_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

with open(os.path.join(_DATA_DIR, "grammar_lessons.json"), encoding="utf-8") as f:
    _LESSONS: list[dict] = json.load(f)


def _sanitize_question(q: dict) -> dict:
    return {k: v for k, v in q.items() if k not in ("answer", "alternatives")}


def _find(lesson_id: int) -> dict | None:
    for l in _LESSONS:
        if l["id"] == lesson_id:
            return l
    return None


def list_lessons() -> list[dict]:
    """Lightweight list view — omits question content."""
    return [
        {
            "id": l["id"],
            "level": l["level"],
            "topic": l["topic"],
            "title": l["title"],
            "question_count": len(l["questions"]),
        }
        for l in _LESSONS
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
