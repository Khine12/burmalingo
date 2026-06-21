"""
Seed script for the Listening feature.

IMPORTANT: LESSONS currently contains only ONE short test lesson. Run this,
listen to the generated audio, and confirm quality and speech rate before
adding more lessons to the list and re-running for bulk generation.

Run:
    cd backend
    python scripts/seed_listening.py
"""
import os
import sys

# Allow importing from the backend root regardless of where the script is run from
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.database import SessionLocal
from app.models.models import ListeningAudio, ListeningQuestion
from app.services.listening_audio import generate_lesson_audio

SPEAKER_NAMES = {"A": "Woman", "B": "Man"}

LESSONS = [
    {
        "slug": "test-cafe-order",
        "title": "Ordering at a Cafe",
        "level": "intermediate",
        "turns": [
            ("A", "Hi there, what can I get for you today?"),
            ("B", "I'd like a medium latte and a blueberry muffin, please."),
            ("A", "Sure. Would you like that for here or to go?"),
            ("B", "To go, thanks."),
        ],
        "questions": [
            {
                "type": "fill_blank",
                "prompt": "The customer orders a medium latte and a ____ muffin.",
                "options": None,
                "correct_answer": "blueberry",
                "order": 1,
            },
            {
                "type": "true_false",
                "prompt": "The customer is eating in the cafe.",
                "options": None,
                "correct_answer": "False",
                "order": 2,
            },
            {
                "type": "mcq",
                "prompt": "What size latte does the customer order?",
                "options": ["Small", "Medium", "Large"],
                "correct_answer": "Medium",
                "order": 3,
            },
        ],
    },
]


def build_transcript(turns: list[tuple[str, str]]) -> str:
    return "\n".join(f"{SPEAKER_NAMES[speaker]}: {text}" for speaker, text in turns)


def main() -> None:
    db = SessionLocal()
    try:
        for lesson in LESSONS:
            print(f"--- Generating audio for '{lesson['slug']}' (level={lesson['level']}) ---")
            audio_url = generate_lesson_audio(lesson["turns"], lesson["slug"], lesson["level"])
            print(f"  audio: {audio_url}")

            audio = ListeningAudio(
                title=lesson["title"],
                level=lesson["level"],
                transcript=build_transcript(lesson["turns"]),
                audio_url=audio_url,
            )
            db.add(audio)
            db.flush()  # assign audio.id before inserting questions

            for q in lesson["questions"]:
                db.add(
                    ListeningQuestion(
                        audio_id=audio.id,
                        type=q["type"],
                        prompt=q["prompt"],
                        options=q["options"],
                        correct_answer=q["correct_answer"],
                        order=q["order"],
                    )
                )

            db.commit()
            print(f"  Inserted ListeningAudio id={audio.id} with {len(lesson['questions'])} question(s)\n")

        print("Done.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
