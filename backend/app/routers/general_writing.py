from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.general_writing_service import GeneralWritingService

router = APIRouter()

TOPICS = {
    "basic": [
        {"id": 0, "text": "Write about yourself — your name, where you are from, your family, and what you do every day.", "outline": None},
        {"id": 1, "text": "Describe your weekly routine. What do you do on weekdays and weekends?", "outline": None},
        {"id": 2, "text": "What did you do for your last birthday? Who were you with and what did you eat?", "outline": None},
        {"id": 3, "text": "What is your favorite food? Describe it and explain why you like it.", "outline": None},
        {"id": 4, "text": "Describe your home — how many rooms it has, what it looks like, and what you like most about it.", "outline": None},
        {"id": 5, "text": "Write an email to a friend inviting them to your birthday party.", "outline": "Paragraph 1: Greet your friend and say you are having a birthday party.\nParagraph 2: Give the date, time, and place of the party.\nParagraph 3: Tell them what you will do at the party (food, activities).\nParagraph 4: Ask them to reply and say you hope they can come."},
        {"id": 6, "text": "What did you do during Thingyan Water Festival? Describe your activities and how you felt.", "outline": None},
        {"id": 7, "text": "Describe one person in your family. What do they look like and what are they like as a person?", "outline": None},
        {"id": 8, "text": "Write about a trip you went on. Where did you go, who were you with, and what did you do?", "outline": None},
        {"id": 9, "text": "Write an email to your teacher explaining that you cannot come to class tomorrow.", "outline": "Paragraph 1: Greet your teacher politely.\nParagraph 2: Explain that you cannot come to class tomorrow.\nParagraph 3: Give a reason why (you are sick, you have a family matter, etc.).\nParagraph 4: Ask about the homework or what you will miss. Say sorry and thank them."},
    ],
    "elementary": [
        {"id": 0, "text": "Describe your best friend. What do they look like, what is their personality, and why are they important to you?", "outline": None},
        {"id": 1, "text": "Write about a Burmese tradition or festival that you enjoy. What happens and why is it special to you?", "outline": None},
        {"id": 2, "text": "Describe a place in Myanmar that you think is beautiful or interesting. What is it like and why do you like it?", "outline": None},
        {"id": 3, "text": "Write about a time you helped someone. What happened, how did you help, and how did you feel afterward?", "outline": None},
        {"id": 4, "text": "What job would you like to have in the future? Describe it and explain why you want it.", "outline": None},
        {"id": 5, "text": "Write a complaint email to a shop about a product you bought that was broken when you opened it.", "outline": "Paragraph 1: Say who you are and when you bought the product.\nParagraph 2: Describe the problem — what is broken or wrong.\nParagraph 3: Say what you want them to do (replace it, give a refund).\nParagraph 4: Say you hope they reply quickly. Thank them."},
        {"id": 6, "text": "What are the advantages and disadvantages of using a smartphone every day?", "outline": None},
        {"id": 7, "text": "Describe a trip you would like to take in the future. Where would you go, who would you go with, and what would you do?", "outline": None},
        {"id": 8, "text": "Write an email to a hotel to book a room for two nights.", "outline": "Paragraph 1: Say you would like to book a room and give the dates.\nParagraph 2: Describe what kind of room you want (single, double, with breakfast).\nParagraph 3: Ask any questions you have (price, facilities, location).\nParagraph 4: Give your contact details and ask them to confirm the booking."},
        {"id": 9, "text": "Describe someone you admire. Who are they, what do they do, and why do you look up to them?", "outline": None},
    ],
    "pre-intermediate": [
        {"id": 0, "text": "Do you prefer living in a city or a village? Give reasons and examples to support your answer.", "outline": None},
        {"id": 1, "text": "Describe a tradition or celebration that is important to your family. What happens and why is it meaningful?", "outline": None},
        {"id": 2, "text": "Write a complaint email to a shop about a product that stopped working after only one week.", "outline": "Paragraph 1: Introduce yourself and explain when and where you bought the product.\nParagraph 2: Describe exactly what went wrong and when it happened.\nParagraph 3: Explain how this has affected you.\nParagraph 4: State clearly what you want — a replacement, refund, or repair. Give a deadline for their response."},
        {"id": 3, "text": "What do you think is the most important quality in a good friend? Use examples to explain your answer.", "outline": None},
        {"id": 4, "text": "Describe a goal you want to achieve in the next two years. What is it, why is it important to you, and what is your plan to reach it?", "outline": None},
        {"id": 5, "text": "Do you think it is better to save money or spend it enjoying life? Give your opinion with reasons.", "outline": None},
        {"id": 6, "text": "Write about a time you made a mistake. What happened, how did it affect you, and what did you learn from it?", "outline": None},
        {"id": 7, "text": "What is your favorite season and why? Describe what you usually do and how you feel during that time of year.", "outline": None},
        {"id": 8, "text": "Some people say watching TV is a waste of time. Do you agree or disagree? Give reasons and examples.", "outline": None},
        {"id": 9, "text": "Describe your neighborhood — what you like about it, what the people are like, and what you would change if you could.", "outline": None},
    ],
}

class GradeRequest(BaseModel):
    topic: str
    essay: str
    level: str

@router.get("/topics/{level}")
def get_topics(level: str):
    if level not in TOPICS:
        raise HTTPException(status_code=404, detail="Level not found")
    return TOPICS[level]

@router.post("/grade")
def grade_essay(payload: GradeRequest):
    word_count = len(payload.essay.split())
    if word_count < 30:
        raise HTTPException(status_code=422, detail="Please write at least 30 words.")
    valid_topics = [t["text"] for t in TOPICS.get(payload.level, [])]
    if payload.topic not in valid_topics:
        raise HTTPException(status_code=422, detail="Invalid topic")
    return GeneralWritingService.grade_essay(payload.topic, payload.essay, payload.level)
