import json
from openai import OpenAI
from app.config import settings
from app.models.models import TranslationPrompt

LEVEL_NAMES = {
    5: "Intermediate I", 6: "Intermediate II", 7: "Intermediate III",
    8: "Upper-Intermediate I", 9: "Upper-Intermediate II", 10: "IELTS Practice"
}

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class TranslationService:

    @staticmethod
    def check_translation(prompt: TranslationPrompt, user_answer: str, user_level: int) -> dict:
        level_name = LEVEL_NAMES.get(user_level, "Intermediate I")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            max_tokens=800,
            messages=[
                {
                    "role": "system",
                    "content": f"""You are an English teacher for Burmese speakers at Level {user_level}/10 ({level_name}).
Evaluate the student's English translation of a Burmese sentence.
Calibrate feedback complexity to their level — simpler for level 5, more detailed for level 10.
Respond ONLY with valid JSON, no markdown:
{{
  "naturalVersion": "the most natural English translation",
  "feedback": "2-3 sentences evaluating meaning accuracy and grammar",
  "tips": ["one specific grammar or vocabulary tip"]
}}"""
                },
                {
                    "role": "user",
                    "content": f'Burmese sentence: "{prompt.burmese}"\nStudent answer: "{user_answer}"'
                }
            ]
        )

        raw = response.choices[0].message.content
        return json.loads(raw.strip())