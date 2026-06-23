"""Shared grading logic for the static quiz/passage content (Reading,
Grammar, Vocabulary lessons). Mirrors the isAnswerCorrect()/correctLabel()
functions previously duplicated client-side in ReadingPracticePage.tsx,
GeneralReadingPage.tsx, GrammarPracticePage.tsx, and VocabularyPracticePage.tsx
— consolidated here since the logic is identical across all four, unlike the
per-feature quota modules which stay separate.

Question shapes (from the exported JSON):
  tfng     — answer: "TRUE" | "FALSE" | "NOT GIVEN", exact string match
  multiple / matching / vocab — answer: int index into `options`
  fillin   — answer: str, case/whitespace-insensitive; optional `alternatives`
"""
from typing import Any


def is_correct(question: dict, user_answer: Any) -> bool:
    if user_answer is None:
        return False

    qtype = question["type"]

    if qtype == "tfng":
        return isinstance(user_answer, str) and user_answer == question["answer"]

    if qtype in ("multiple", "matching", "vocab"):
        return isinstance(user_answer, int) and user_answer == question["answer"]

    if qtype == "fillin":
        if not isinstance(user_answer, str) or not user_answer.strip():
            return False
        norm = user_answer.strip().lower()
        if norm == str(question["answer"]).strip().lower():
            return True
        for alt in question.get("alternatives") or []:
            if norm == alt.strip().lower():
                return True
        return False

    return False


def correct_label(question: dict) -> str:
    qtype = question["type"]

    if qtype == "tfng":
        return question["answer"]

    if qtype in ("multiple", "matching", "vocab"):
        return question["options"][question["answer"]]

    if qtype == "fillin":
        return question["answer"]

    return ""


def grade(questions: list[dict], answers: dict[int, Any]) -> tuple[float, list[dict]]:
    """Grade a full set of answers keyed by question id.

    Returns (score_percent, results) where each result is
    {question_id, is_correct, correct_answer}.
    """
    results = []
    correct_count = 0
    for q in questions:
        user_answer = answers.get(q["id"])
        correct = is_correct(q, user_answer)
        if correct:
            correct_count += 1
        results.append({
            "question_id": q["id"],
            "is_correct": correct,
            "correct_answer": correct_label(q),
        })

    score = round(correct_count / len(questions) * 100, 2) if questions else 0.0
    return score, results
