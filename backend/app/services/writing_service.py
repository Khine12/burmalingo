import json
from openai import OpenAI
from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class WritingService:
    @staticmethod
    def grade_essay(topic: str, essay: str) -> dict:
        response = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=1200,
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a strict IELTS Task 2 examiner using official band descriptors. "
                        "FIRST, check if the student's answer is relevant to the topic. "
                        "If it is completely off-topic, respond ONLY with this JSON: "
                        '{\"off_topic\": true, \"message\": \"Your answer does not match the topic. Please read the question again and try.\"} '
                        "If it is relevant, proceed with full grading. "
                        "STRICT SCORING RULES:\n"
                        "- Score every criterion from 3.0 to 8.0 in 0.5 increments only\n"
                        "- Overall band = average of 4 criteria rounded to nearest 0.5, always round DOWN when between values\n"
                        "- Never give overall band above 8.0\n"
                        "- Errors in almost every sentence → Grammatical Range must be 3.5–4.5\n"
                        "- Basic vocabulary with heavy repetition → Lexical Resource must be 4.0–5.0\n"
                        "- Missing articles, wrong verb forms throughout → Grammatical Range 4.0 maximum\n"
                        "- Band 6 grammar requires errors that RARELY impede communication — frequent errors = 5.0 or below\n"
                        "- Band 6 task response requires ideas that are developed — undeveloped ideas = 5.0 or below\n"
                        "- Improvements must quote exact sentences or phrases from the student's essay\n\n"
                        "Respond ONLY with valid JSON, no markdown:\n"
                        "{\n"
                        '  "off_topic": false,\n'
                        '  "overall_band": 5.5,\n'
                        '  "task_achievement": 6.0,\n'
                        '  "coherence_cohesion": 5.5,\n'
                        '  "lexical_resource": 5.0,\n'
                        '  "grammatical_range_accuracy": 4.5,\n'
                        '  "improvements": [\n'
                        '    "quote exact phrase from essay — explain the error and how to fix it",\n'
                        '    "quote exact phrase from essay — explain the error and how to fix it",\n'
                        '    "quote exact phrase from essay — explain the error and how to fix it"\n'
                        "  ]\n"
                        "}"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Topic: {topic}\n\nEssay:\n{essay}",
                },
            ],
        )
        raw = response.choices[0].message.content
        return json.loads(raw.strip())
