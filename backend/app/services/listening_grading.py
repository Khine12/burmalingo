from app.models.models import ListeningQuestionTypeEnum


def _normalize(s: str) -> str:
    s = s.replace("$", "").replace(",", "")
    return " ".join(s.strip().lower().split())


def _variants(correct_answer: str) -> list[str]:
    """Split a pipe-separated correct_answer into its accepted variants."""
    return [v.strip() for v in correct_answer.split("|") if v.strip()]


def grade_answer(question_type: ListeningQuestionTypeEnum, user_answer: str, correct_answer: str) -> bool:
    """mcq/true_false require an exact match against any variant; fill_blank
    matches any variant after case + whitespace + $/comma normalization."""
    variants = _variants(correct_answer)
    if question_type == ListeningQuestionTypeEnum.fill_blank:
        normalized_user = _normalize(user_answer)
        return any(normalized_user == _normalize(v) for v in variants)
    return user_answer in variants


def display_answer(correct_answer: str) -> str:
    """Human-readable rendering of a (possibly multi-variant) correct_answer."""
    return " / ".join(_variants(correct_answer))
