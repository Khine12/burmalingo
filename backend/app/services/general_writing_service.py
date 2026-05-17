import json
from openai import OpenAI
from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class GeneralWritingService:
    @staticmethod
    def grade_essay(topic: str, essay: str, level: str) -> dict:
        level_guidance = {
            "basic": "The student is at Basic level. Expect simple sentences and common vocabulary. Focus on major grammar errors like wrong verb tenses, missing articles, and subject-verb agreement. Be encouraging.",
            "elementary": "The student is at Elementary level. Expect simple to medium complexity sentences. Check grammar, vocabulary variety, and sentence structure. Be supportive.",
            "pre-intermediate": "The student is at Pre-Intermediate level. Expect more complex sentences and wider vocabulary. Check grammar accuracy, coherence, and argument development."
        }
        response = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=1200,
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are a friendly and encouraging English teacher helping a Burmese learner improve their writing. "
                        f"{level_guidance.get(level, level_guidance['basic'])} "
                        "FIRST, check if the student's answer is relevant to the topic. "
                        "If it is completely off-topic, respond ONLY with this JSON: "
                        '{\"off_topic\": true, \"message\": \"Your answer does not match the topic. Please read the question again and try.\"} '
                        "If it is relevant, give warm, clear feedback. "
                        "Do NOT give IELTS band scores. Instead give a star rating: 3 stars for great, 2 for good effort, 1 for keep practicing. "
                        "List specific grammar mistakes with corrections. Quote exact phrases from the essay. "
                        "Always end with a short model answer (2-4 sentences for basic, 4-6 for elementary, 6-8 for pre-intermediate). "
                        "Respond ONLY with valid JSON, no markdown:\n"
                        "{\n"
                        '  "off_topic": false,\n'
                        '  "stars": 2,\n'
                        '  "positive": "One or two things the student did well",\n'
                        '  "improvements": [\n'
                        '    "Exact phrase from essay — what is wrong and how to fix it",\n'
                        '    "Exact phrase from essay — what is wrong and how to fix it"\n'
                        '  ],\n'
                        '  "model_answer": "A simple correct version of the answer at the appropriate level"\n'
                        "}"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Topic: {topic}\n\nStudent's answer:\n{essay}",
                },
            ],
        )
        raw = response.choices[0].message.content
        return json.loads(raw.strip())
