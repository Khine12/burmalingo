import json
from openai import OpenAI
from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


class WritingService:

    @staticmethod
    def grade_essay(topic: str, essay: str) -> dict:
        response = client.chat.completions.create(
            model="gpt-4o",
            max_tokens=1000,
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a strict IELTS Task 2 examiner using official band descriptors. "
                        "You grade slightly stricter than the real exam — this is a practice tool "
                        "and students should aim higher than their practice score. "
                        "Maximum score is 8.0. Never give 8.5 or 9.0.\n\n"
                        "Score each criterion from 3.0 to 8.0 in 0.5 increments only.\n\n"
                        "TASK RESPONSE:\n"
                        "8: Prompt fully and sufficiently addressed, clear well-developed position, ideas well extended and supported\n"
                        "7: Main parts addressed, clear developed position, may over-generalise or lack precision in supporting ideas\n"
                        "6: Main parts addressed but some may be more fully covered than others, position relevant but conclusions may be unclear or repetitive, some ideas insufficiently developed\n"
                        "5: Prompt incompletely addressed, position expressed but development unclear, ideas limited and not sufficiently developed, may be repetitive\n"
                        "4: Prompt tackled minimally or tangentially, position hard to find, main ideas difficult to identify, large parts repetitive\n"
                        "3: No part adequately addressed, no relevant position identifiable, few ideas and insufficiently developed\n\n"
                        "COHERENCE & COHESION:\n"
                        "8: Followed with ease, ideas logically sequenced, cohesion well managed, paragraphing appropriate\n"
                        "7: Logically organised, clear progression throughout, cohesive devices used flexibly but with some inaccuracy or over/under use\n"
                        "6: Generally arranged coherently, clear overall progression, cohesive devices used to some effect but may be faulty or mechanical, paragraphing may not always be logical\n"
                        "5: Organisation evident but not wholly logical, ideas can be followed but sentences not fluently linked, limited or overuse of cohesive devices, paragraphing may be inadequate\n"
                        "4: Ideas evident but not arranged coherently, no clear progression, relationships between ideas unclear or inadequately marked, may be no paragraphing\n"
                        "3: No apparent logical organisation, ideas discernible but difficult to relate, minimal use of cohesive devices, difficulty identifying referencing\n\n"
                        "LEXICAL RESOURCE:\n"
                        "8: Wide resource fluently and flexibly used to convey precise meanings, skilful use of uncommon or idiomatic items, occasional inaccuracies have minimal impact\n"
                        "7: Sufficient for flexibility and precision, some less common or idiomatic items used, awareness of style evident though inappropriacies occur, few spelling errors\n"
                        "6: Generally adequate, meaning generally clear despite restricted range or lack of precision, some spelling or word formation errors that do not impede communication\n"
                        "5: Limited but minimally adequate, simple vocabulary used accurately but range does not permit variation, frequent lapses in word choice, errors noticeable and may cause some difficulty\n"
                        "4: Limited and inadequate, vocabulary basic and repetitive, inappropriate word choice or errors in word formation, errors may impede meaning\n"
                        "3: Inadequate, control of word choice and spelling very limited, errors predominate and may severely impede meaning\n\n"
                        "GRAMMATICAL RANGE & ACCURACY:\n"
                        "8: Wide range flexibly and accurately used, majority of sentences error-free, punctuation well managed, occasional non-systematic errors have minimal impact\n"
                        "7: Variety of complex structures with some flexibility and accuracy, generally well controlled, error-free sentences frequent, few errors do not impede communication\n"
                        "6: Mix of simple and complex sentence forms but flexibility limited, complex structures less accurate than simple ones, errors in grammar and punctuation occur but rarely impede communication\n"
                        "5: Limited and repetitive range, complex sentences attempted but tend to be faulty, greatest accuracy on simple sentences, grammatical errors frequent and may cause difficulty, punctuation may be faulty\n"
                        "4: Very limited range of structures, subordinate clauses rare and simple sentences predominate, grammatical errors frequent and may impede meaning, punctuation often faulty\n"
                        "3: Sentence forms attempted but errors in grammar and punctuation predominate, prevents most meaning from coming through\n\n"
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
