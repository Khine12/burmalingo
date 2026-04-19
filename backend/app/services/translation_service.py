import anthropic
import json
from app.config import settings
from app.models.models import TranslationPrompt

LEVEL_NAMES = {
    5: "Intermediate I", 6: "Intermediate II", 7: "Intermediate III",
    8: "Upper-Intermediate I", 9: "Upper-Intermediate II", 10: "Advanced"
}

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

class TranslationService:

    @staticmethod
    def check_translation(prompt: TranslationPrompt, user_answer: str, user_level: int) -> dict:
        """
        Send the student's translation to Claude for evaluation.
        API key stays on the server — never exposed to the browser.
        """
        level_name = LEVEL_NAMES.get(user_level, "Intermediate")

        message = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=800,
            system=f"""You are an English teacher for Burmese speakers at Level {user_level}/10 ({level_name}).
A student was given a Burmese sentence and asked to translate it into English.
Evaluate their answer. Calibrate feedback complexity to their level.
Respond ONLY with valid JSON — no markdown, no extra text:
{{
  "naturalVersion": "the most natural English translation",
  "feedback": "2-3 sentences evaluating meaning accuracy and grammar",
  "tips": ["one specific grammar or vocabulary tip for this sentence"]
}}""",
            messages=[{
                "role": "user",
                "content": f'Burmese: "{prompt.burmese}"\nStudent answer: "{user_answer}"'
            }]
        )

        raw = message.content[0].text
        return json.loads(raw.strip())
