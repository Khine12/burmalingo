export interface LevelTestQuestion {
  id: number
  level: number
  type: 'grammar' | 'vocabulary' | 'reading' | 'correction'
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Basic',
  2: 'Elementary',
  3: 'Pre-Intermediate',
  4: 'Intermediate I',
  5: 'Intermediate II',
  6: 'Upper-Intermediate',
  7: 'IELTS Preparation',
}

export const QUESTIONS: LevelTestQuestion[] = [
  // ── Level 1: Basic ────────────────────────────────────────────────────
  {
    id: 1, level: 1, type: 'grammar',
    question: 'Choose the correct sentence:',
    options: ['I am have a book', 'I have a book', 'I has a book', 'I am book'],
    correct: 1,
    explanation: "'Have' is used with I / you / we / they. The correct sentence is 'I have a book'.",
  },
  {
    id: 2, level: 1, type: 'vocabulary',
    question: "What is the opposite of 'hot'?",
    options: ['warm', 'cold', 'big', 'fast'],
    correct: 1,
    explanation: "The opposite of 'hot' is 'cold'.",
  },
  {
    id: 3, level: 1, type: 'grammar',
    question: 'She ___ a student.',
    options: ['am', 'are', 'is', 'be'],
    correct: 2,
    explanation: "Use 'is' with he / she / it (third person singular).",
  },
  {
    id: 4, level: 1, type: 'vocabulary',
    question: 'Which word means a place where you sleep?',
    options: ['kitchen', 'bedroom', 'office', 'garden'],
    correct: 1,
    explanation: 'A bedroom is the room in a home where you sleep.',
  },
  {
    id: 5, level: 1, type: 'grammar',
    question: 'They ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    correct: 0,
    explanation: "Simple present with 'they' uses the base verb 'go' (no -s ending).",
  },

  // ── Level 2: Elementary ───────────────────────────────────────────────
  {
    id: 6, level: 2, type: 'grammar',
    question: 'I ___ watching TV when she called.',
    options: ['was', 'were', 'am', 'is'],
    correct: 0,
    explanation: "Past continuous with 'I' uses 'was'. 'Were' is used with you / we / they.",
  },
  {
    id: 7, level: 2, type: 'vocabulary',
    question: 'The movie was very ___. I fell asleep.',
    options: ['exciting', 'boring', 'funny', 'scary'],
    correct: 1,
    explanation: "'Boring' means not interesting — which explains why the speaker fell asleep.",
  },
  {
    id: 8, level: 2, type: 'grammar',
    question: 'She has ___ eaten lunch.',
    options: ['yet', 'already', 'still', 'never'],
    correct: 1,
    explanation: "'Already' is used in affirmative sentences to show something happened sooner than expected.",
  },
  {
    id: 9, level: 2, type: 'reading',
    question: 'Tom wakes up at 7am. He eats breakfast and walks to work. He works from 9am to 5pm. What time does Tom start work?',
    options: ['7am', '8am', '9am', '5pm'],
    correct: 2,
    explanation: "The passage states 'He works from 9am to 5pm', so he starts at 9am.",
  },
  {
    id: 10, level: 2, type: 'vocabulary',
    question: "What does 'exhausted' mean?",
    options: ['very hungry', 'very tired', 'very happy', 'very cold'],
    correct: 1,
    explanation: "'Exhausted' means extremely tired, having used up all your energy.",
  },

  // ── Level 3: Pre-Intermediate ─────────────────────────────────────────
  {
    id: 11, level: 3, type: 'grammar',
    question: 'If it ___ tomorrow, we will cancel the trip.',
    options: ['rain', 'rains', 'rained', 'will rain'],
    correct: 1,
    explanation: "First conditional uses present simple in the if-clause: 'If it rains…'.",
  },
  {
    id: 12, level: 3, type: 'vocabulary',
    question: 'The government needs to ___ the problem of unemployment.',
    options: ['make', 'address', 'tell', 'grow'],
    correct: 1,
    explanation: "'Address a problem' means to deal with or take action on it. This is a common collocation.",
  },
  {
    id: 13, level: 3, type: 'grammar',
    question: 'This is the city ___ I was born.',
    options: ['which', 'who', 'where', 'what'],
    correct: 2,
    explanation: "'Where' is used to introduce a relative clause referring to a place.",
  },
  {
    id: 14, level: 3, type: 'correction',
    question: "Find the error: 'She suggested to go to the cinema.'",
    options: [
      "'suggested' should be 'suggestion'",
      "'to go' should be 'going'",
      "'the' should be 'a'",
      'No error',
    ],
    correct: 1,
    explanation: "'Suggest' is followed by a gerund (-ing form), not an infinitive: 'suggested going'.",
  },
  {
    id: 15, level: 3, type: 'reading',
    question: "Despite being expensive, electric cars are becoming more popular because they are better for the environment. Why are electric cars becoming more popular?",
    options: [
      'They are cheap',
      'They are fast',
      'They are better for the environment',
      'They are comfortable',
    ],
    correct: 2,
    explanation: "The passage states the environmental benefit is the reason for growing popularity.",
  },

  // ── Level 4: Intermediate I ───────────────────────────────────────────
  {
    id: 16, level: 4, type: 'grammar',
    question: 'By the time she arrived, we ___ for two hours.',
    options: ['waited', 'were waiting', 'had been waiting', 'have waited'],
    correct: 2,
    explanation: "Past perfect continuous ('had been waiting') shows an ongoing action that continued up to a specific past moment.",
  },
  {
    id: 17, level: 4, type: 'vocabulary',
    question: 'The new policy will ___ small businesses most severely.',
    options: ['effect', 'affect', 'infect', 'reflect'],
    correct: 1,
    explanation: "'Affect' is the verb meaning to have an impact on something. 'Effect' is usually a noun.",
  },
  {
    id: 18, level: 4, type: 'grammar',
    question: "She ___ have forgotten — she never forgets anything.",
    options: ["can't", "mustn't", "shouldn't", "wouldn't"],
    correct: 0,
    explanation: "'Can't have + past participle' expresses impossibility about a past event.",
  },
  {
    id: 19, level: 4, type: 'correction',
    question: "Find the error: 'The informations you gave me was very useful.'",
    options: [
      "'informations' should be 'information'",
      "'gave' should be 'give'",
      "'was' should be 'were'",
      'No error',
    ],
    correct: 0,
    explanation: "'Information' is an uncountable noun in English — it has no plural form.",
  },
  {
    id: 20, level: 4, type: 'reading',
    question: 'While urbanisation brings economic opportunities, it simultaneously creates pressure on infrastructure and increases social inequality, particularly in developing nations. What is one negative effect of urbanisation mentioned?',
    options: [
      'Economic opportunities',
      'Population decrease',
      'Increased social inequality',
      'Better infrastructure',
    ],
    correct: 2,
    explanation: "The passage explicitly mentions increased social inequality as a negative effect.",
  },

  // ── Level 5: Intermediate II ──────────────────────────────────────────
  {
    id: 21, level: 5, type: 'grammar',
    question: 'Not only ___ late, but he also forgot his report.',
    options: ['he arrived', 'did he arrive', 'he did arrive', 'arrived he'],
    correct: 1,
    explanation: "After 'not only' at the start of a clause, subject-auxiliary inversion is required: 'did he arrive'.",
  },
  {
    id: 22, level: 5, type: 'vocabulary',
    question: 'The report was ___ in its findings, covering every possible angle.',
    options: ['comprehensive', 'aggressive', 'redundant', 'vague'],
    correct: 0,
    explanation: "'Comprehensive' means complete and thorough, covering all aspects of something.",
  },
  {
    id: 23, level: 5, type: 'grammar',
    question: 'I wish I ___ harder when I was at university.',
    options: ['study', 'studied', 'had studied', 'would study'],
    correct: 2,
    explanation: "'Wish' + past perfect expresses regret about something that did not happen in the past.",
  },
  {
    id: 24, level: 5, type: 'correction',
    question: "Find the error: 'The committee have reached their decision after a long debate.'",
    options: [
      "'committee' should be 'committees'",
      "'have' should be 'has'",
      "'their' should be 'its'",
      "No error — both B and C are acceptable in British English",
    ],
    correct: 3,
    explanation: "In British English, collective nouns like 'committee' can take either a singular or plural verb and pronoun. Both are acceptable.",
  },
  {
    id: 25, level: 5, type: 'reading',
    question: "The placebo effect demonstrates that the mind's expectations can produce measurable physiological changes, challenging the traditional boundary between psychological and physical medicine. What does this suggest?",
    options: [
      'Placebos are more effective than real medicine',
      'Psychology and physiology may be more connected than traditionally thought',
      'Expectations always lead to positive health outcomes',
      'Traditional medicine is ineffective',
    ],
    correct: 1,
    explanation: "The passage says the placebo effect challenges the boundary between psychological and physical medicine — implying they are more connected than thought.",
  },

  // ── Level 6: Upper-Intermediate ───────────────────────────────────────
  {
    id: 26, level: 6, type: 'grammar',
    question: 'Had the government intervened earlier, the crisis ___ avoided.',
    options: ['could have been', 'could be', 'would be', 'can be'],
    correct: 0,
    explanation: "This is an inverted third conditional: 'Had + subject + past participle' replaces 'If + subject + had + past participle'. The result clause uses 'would/could have + past participle'.",
  },
  {
    id: 27, level: 6, type: 'vocabulary',
    question: "The author's prose style is deliberately ___, using simple language to convey complex ideas.",
    options: ['verbose', 'lucid', 'ambiguous', 'ornate'],
    correct: 1,
    explanation: "'Lucid' means expressed clearly and intelligibly — the opposite of complex or obscure.",
  },
  {
    id: 28, level: 6, type: 'grammar',
    question: 'The regulations require that all employees ___ safety training annually.',
    options: ['complete', 'completes', 'completed', 'completing'],
    correct: 0,
    explanation: "'Require that' triggers the subjunctive mood in formal English: the base verb form without -s or past tense inflection.",
  },
  {
    id: 29, level: 6, type: 'reading',
    question: "The paradox of tolerance, first articulated by Karl Popper, suggests that a society which is tolerant without limit will eventually be seized by the intolerant. To preserve tolerance, a society must be intolerant of intolerance. What does Popper's paradox imply?",
    options: [
      'Tolerance is always harmful to society',
      'Unlimited tolerance can ultimately destroy tolerance itself',
      'Intolerant societies are inherently stronger',
      'Karl Popper opposed freedom of speech',
    ],
    correct: 1,
    explanation: "Popper argues that unlimited tolerance paradoxically enables the intolerant to destroy tolerance — so tolerance itself requires limits.",
  },
  {
    id: 30, level: 6, type: 'correction',
    question: "Find the error: 'Neither the manager nor the employees was informed of the changes.'",
    options: [
      "'manager' should be 'managers'",
      "'nor' should be 'or'",
      "'was' should be 'were'",
      'No error',
    ],
    correct: 2,
    explanation: "With 'neither…nor', the verb agrees with the nearest subject. The nearest subject is 'employees' (plural), so the verb must be 'were'.",
  },

  // ── Level 7: IELTS Preparation ────────────────────────────────────────
  {
    id: 31, level: 7, type: 'grammar',
    question: 'The extent ___ technological disruption will reshape labour markets remains deeply contested among economists.',
    options: ['which', 'to which', 'in which', 'for which'],
    correct: 1,
    explanation: "'The extent to which' is the fixed phrase used in formal academic writing. 'To which' is required because we say 'to what extent'.",
  },
  {
    id: 32, level: 7, type: 'vocabulary',
    question: 'Critics argue that the report ___ over the structural causes of poverty, offering only superficial analysis.',
    options: ['glosses', 'ponders', 'elaborates', 'scrutinises'],
    correct: 0,
    explanation: "'Gloss over' means to deal with something too quickly, ignoring important details or problems.",
  },
  {
    id: 33, level: 7, type: 'grammar',
    question: 'It is imperative that the committee ___ a decision before the funding deadline.',
    options: ['reached', 'reaches', 'reach', 'reaching'],
    correct: 2,
    explanation: "'It is imperative that' requires the subjunctive: the base form 'reach' (no -s, no past tense). This is standard in formal written English.",
  },
  {
    id: 34, level: 7, type: 'reading',
    question: "Cognitive load theory posits that working memory has a finite capacity and that instructional design should minimise extraneous load — processing that does not contribute to learning — while maximising germane load, which builds schemas. What should instructional designers prioritise according to this theory?",
    options: [
      'Maximising the total volume of information presented at once',
      'Reducing all types of cognitive load equally',
      'Minimising irrelevant processing while supporting schema formation',
      'Ensuring working memory is always fully engaged',
    ],
    correct: 2,
    explanation: "The theory specifies minimising extraneous (irrelevant) load and maximising germane (schema-building) load — not reducing all load equally.",
  },
  {
    id: 35, level: 7, type: 'correction',
    question: "Find the error: 'The research, along with its numerous subsidiary findings, have been published in three peer-reviewed journals.'",
    options: [
      "'research' should be 'researches'",
      "'along with' should be 'together with'",
      "'have' should be 'has'",
      'No error',
    ],
    correct: 2,
    explanation: "The grammatical subject is 'the research' (singular). 'Along with its findings' is a parenthetical phrase that does not change the subject. The verb must be 'has'.",
  },
]
