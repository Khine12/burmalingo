import json
import os

from app.services.quiz_grading import grade as grade_questions

_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")


def _load(filename: str) -> list[dict]:
    with open(os.path.join(_DATA_DIR, filename), encoding="utf-8") as f:
        return json.load(f)


_PASSAGES = {
    "ielts": _load("reading_ielts.json"),
    "general": _load("reading_general.json"),
}


def _sanitize_question(q: dict) -> dict:
    # explanation is stripped too — most explanations restate the correct
    # answer outright (e.g. "The passage states X is TRUE"), so it can't be
    # shipped before the user has answered. It's returned by grade_passage()
    # instead, alongside the result, once grading has actually happened.
    return {k: v for k, v in q.items() if k not in ("answer", "alternatives", "explanation")}


def _find(kind: str, passage_id: int) -> dict | None:
    for p in _PASSAGES[kind]:
        if p["id"] == passage_id:
            return p
    return None


def list_passages(kind: str) -> list[dict]:
    """Lightweight list view — omits passage text and questions."""
    return [
        {k: v for k, v in p.items() if k not in ("passage", "questions")}
        for p in _PASSAGES[kind]
    ]


def get_passage(kind: str, passage_id: int) -> dict | None:
    """Full passage with sanitized questions (no answer/alternatives)."""
    p = _find(kind, passage_id)
    if p is None:
        return None
    return {**p, "questions": [_sanitize_question(q) for q in p["questions"]]}


def grade_passage(kind: str, passage_id: int, answers: dict[int, object]):
    p = _find(kind, passage_id)
    if p is None:
        return None
    return grade_questions(p["questions"], answers)
