"""
Re-synthesize and re-upload audio for every lesson at a given level, using
the current LEVEL_RATES rate.

Use this after tuning LEVEL_RATES in app/services/listening_audio.py — it
overwrites the existing blob in place (same filename), so no DB changes are
needed; only the audio file content changes.

Run:
    cd backend
    python scripts/regenerate_audio.py <level>
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import seed_listening
from app.services.listening_audio import LEVEL_RATES, generate_lesson_audio


def main(level: str) -> None:
    if level not in LEVEL_RATES:
        print(f"Unknown level '{level}'. Valid levels: {', '.join(LEVEL_RATES)}")
        sys.exit(1)

    lessons = [l for l in seed_listening.LESSONS if l["level"] == level]
    if not lessons:
        print(f"No lessons found for level={level}")
        return

    print(f"Regenerating {len(lessons)} lesson(s) at level={level}, rate={LEVEL_RATES[level]}\n")
    for lesson in lessons:
        print(f"--- Regenerating audio for '{lesson['slug']}' ---")
        url = generate_lesson_audio(lesson["turns"], lesson["slug"], lesson["level"])
        print(f"  audio: {url}\n")

    print("Done.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/regenerate_audio.py <level>")
        sys.exit(1)
    main(sys.argv[1])
