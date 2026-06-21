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

DEFAULT_SPEAKER_NAMES = {"A": "Woman", "B": "Man"}

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
    {
        "slug": "supermarket-shopping",
        "title": "Shopping at the Supermarket",
        "level": "beginner",
        "speaker_names": {"A": "Assistant", "B": "Customer"},
        "turns": [
            ("B", "Excuse me, can you help me?"),
            ("A", "Of course. What do you need?"),
            ("B", "Where is the milk?"),
            ("A", "The milk is in the dairy section, in aisle five at the back."),
            ("B", "Thank you. And where are the eggs?"),
            ("A", "The eggs are next to the milk, on the bottom shelf."),
            ("B", "Great. I also need rice and bread."),
            ("A", "Rice is in aisle three. Bread is near the entrance, on your left."),
            ("B", "Do you have any fresh fruit?"),
            ("A", "Yes, the fruit and vegetables are at the front of the store."),
            ("B", "Are the bananas on sale today?"),
            ("A", "Yes, they are cheap this week — one dollar a kilo."),
            ("B", "Good. Can I have a basket, please?"),
            ("A", "Of course. The baskets are by the door. The big trolleys are outside."),
            ("B", "A basket is fine, thank you. Okay, I have everything now."),
            ("A", "Great, let's go to the checkout. Did you find everything?"),
            ("B", "Yes, thank you."),
            ("A", "That's twenty-three dollars, please."),
            ("B", "Do you have a plastic bag?"),
            ("A", "Yes, but a bag costs ten cents."),
            ("B", "That's fine. One bag, please."),
            ("A", "Okay, twenty-three dollars and ten cents."),
            ("B", "Here is my card."),
            ("A", "Thank you. Here is your receipt. Please check the expiry date on the milk."),
            ("B", "Thank you very much."),
            ("A", "You're welcome. Have a good day!"),
        ],
        "questions": [
            {"type": "fill_blank", "prompt": "The milk is in aisle ___.", "options": None, "correct_answer": "five|5", "order": 1},
            {"type": "fill_blank", "prompt": "Bananas cost ___ dollar a kilo.", "options": None, "correct_answer": "one|1", "order": 2},
            {"type": "fill_blank", "prompt": "A plastic bag costs ___ cents.", "options": None, "correct_answer": "ten|10", "order": 3},
            {"type": "fill_blank", "prompt": "The total is ___ dollars and ten cents.", "options": None, "correct_answer": "twenty-three|23", "order": 4},
            {"type": "fill_blank", "prompt": "The customer also needs rice and ___.", "options": None, "correct_answer": "bread", "order": 5},
            {"type": "true_false", "prompt": "The eggs are next to the milk.", "options": None, "correct_answer": "True", "order": 6},
            {"type": "true_false", "prompt": "The bananas are expensive this week.", "options": None, "correct_answer": "False", "order": 7},
            {"type": "true_false", "prompt": "The customer takes a big trolley.", "options": None, "correct_answer": "False", "order": 8},
            {"type": "true_false", "prompt": "The bread is near the entrance.", "options": None, "correct_answer": "True", "order": 9},
            {"type": "true_false", "prompt": "The customer pays with cash.", "options": None, "correct_answer": "False", "order": 10},
            {"type": "mcq", "prompt": "Where is the bread?", "options": ["at the back", "near the entrance", "in aisle five"], "correct_answer": "near the entrance", "order": 11},
            {"type": "mcq", "prompt": "How does the customer pay?", "options": ["cash", "card", "phone"], "correct_answer": "card", "order": 12},
            {"type": "mcq", "prompt": "What should the customer check?", "options": ["the receipt total", "the expiry date on the milk", "the address"], "correct_answer": "the expiry date on the milk", "order": 13},
            {"type": "mcq", "prompt": "Where are the fruit and vegetables?", "options": ["at the front", "in aisle three", "at the back"], "correct_answer": "at the front", "order": 14},
            {"type": "mcq", "prompt": "The eggs are on the ___ shelf.", "options": ["top", "middle", "bottom"], "correct_answer": "bottom", "order": 15},
        ],
    },
    {
        "slug": "asking-directions",
        "title": "Asking for Directions",
        "level": "beginner",
        "speaker_names": {"A": "Local", "B": "Visitor"},
        "turns": [
            ("B", "Excuse me, can you help me?"),
            ("A", "Sure. What are you looking for?"),
            ("B", "How do I get to the train station?"),
            ("A", "It's not far. Go straight down this street."),
            ("B", "Okay, go straight. And then?"),
            ("A", "Then turn left at the traffic lights."),
            ("B", "Turn left at the traffic lights. Okay."),
            ("A", "Yes. Walk past the bank, and the station is on your right."),
            ("B", "It's on my right. Is it far?"),
            ("A", "No, it's about five minutes on foot."),
            ("B", "Great. Is there a pharmacy near here too?"),
            ("A", "Yes. Go back to the traffic lights and turn right."),
            ("B", "Turn right at the traffic lights."),
            ("A", "Yes. The pharmacy is next to the supermarket, on the corner."),
            ("B", "Next to the supermarket, on the corner. Okay."),
            ("A", "It's opposite the post office. You can't miss it."),
            ("B", "Is it open now?"),
            ("A", "Yes, it's open until nine."),
            ("B", "One more thing. Where is the nearest bus stop?"),
            ("A", "The bus stop is across the road, in front of the café."),
            ("B", "Across the road, in front of the café. Which bus goes to the city centre?"),
            ("A", "Take bus number ten. It comes every fifteen minutes."),
            ("B", "Bus number ten. Thank you so much. You are very kind."),
            ("A", "You're welcome. If you get lost, just ask someone again. Have a good day!"),
        ],
        "questions": [
            {"type": "fill_blank", "prompt": "To reach the station, turn left at the ___.", "options": None, "correct_answer": "traffic lights", "order": 1},
            {"type": "fill_blank", "prompt": "The station is about ___ minutes on foot.", "options": None, "correct_answer": "five|5", "order": 2},
            {"type": "fill_blank", "prompt": "The pharmacy is next to the ___.", "options": None, "correct_answer": "supermarket", "order": 3},
            {"type": "fill_blank", "prompt": "Take bus number ___ to the city centre.", "options": None, "correct_answer": "ten|10", "order": 4},
            {"type": "fill_blank", "prompt": "The bus comes every ___ minutes.", "options": None, "correct_answer": "fifteen|15", "order": 5},
            {"type": "true_false", "prompt": "The train station is very far.", "options": None, "correct_answer": "False", "order": 6},
            {"type": "true_false", "prompt": "The pharmacy is opposite the post office.", "options": None, "correct_answer": "True", "order": 7},
            {"type": "true_false", "prompt": "The pharmacy is closed now.", "options": None, "correct_answer": "False", "order": 8},
            {"type": "true_false", "prompt": "The bus stop is across the road.", "options": None, "correct_answer": "True", "order": 9},
            {"type": "true_false", "prompt": "The pharmacy is next to the café.", "options": None, "correct_answer": "False", "order": 10},
            {"type": "mcq", "prompt": "How do you get to the station?", "options": ["go straight then turn left", "turn right immediately", "go back"], "correct_answer": "go straight then turn left", "order": 11},
            {"type": "mcq", "prompt": "The station is on the visitor's:", "options": ["left", "right", "corner"], "correct_answer": "right", "order": 12},
            {"type": "mcq", "prompt": "Where is the pharmacy?", "options": ["on the corner", "inside the station", "next to the bank"], "correct_answer": "on the corner", "order": 13},
            {"type": "mcq", "prompt": "The bus stop is in front of the:", "options": ["bank", "café", "post office"], "correct_answer": "café", "order": 14},
            {"type": "mcq", "prompt": "How often does bus ten come?", "options": ["every 5 minutes", "every 10 minutes", "every 15 minutes"], "correct_answer": "every 15 minutes", "order": 15},
        ],
    },
]


def build_transcript(turns: list[tuple[str, str]], speaker_names: dict[str, str]) -> str:
    return "\n".join(f"{speaker_names[speaker]}: {text}" for speaker, text in turns)


def main() -> None:
    db = SessionLocal()
    try:
        existing_titles = {a.title for a in db.query(ListeningAudio).all()}

        for lesson in LESSONS:
            if lesson["title"] in existing_titles:
                print(f"--- Skipping '{lesson['slug']}' (already seeded) ---")
                continue

            print(f"--- Generating audio for '{lesson['slug']}' (level={lesson['level']}) ---")
            audio_url = generate_lesson_audio(lesson["turns"], lesson["slug"], lesson["level"])
            print(f"  audio: {audio_url}")

            speaker_names = lesson.get("speaker_names", DEFAULT_SPEAKER_NAMES)
            audio = ListeningAudio(
                title=lesson["title"],
                level=lesson["level"],
                transcript=build_transcript(lesson["turns"], speaker_names),
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
