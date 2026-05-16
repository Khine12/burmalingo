export type QuestionType = 'multiple' | 'fillin'
export type GrammarLevel = 'basic' | 'elementary' | 'pre-intermediate'

export interface GrammarQuestion {
  id: number
  type: QuestionType
  question: string
  options?: string[]
  answer: string | number
  explanation: string
}

export interface GrammarLesson {
  id: number
  level: GrammarLevel
  topic: string
  title: string
  questions: GrammarQuestion[]
}

export const grammarLessons: GrammarLesson[] = [
  {
    id: 1,
    level: 'basic',
    topic: 'Present Simple',
    title: 'Present Simple — Habits & Facts',
    questions: [
      { id: 1, type: 'multiple', question: 'She ___ at a hospital.', options: ['work', 'works', 'working', 'worked'], answer: 1, explanation: 'With he/she/it we add -s to the verb. "She works" is correct.' },
      { id: 2, type: 'multiple', question: 'They ___ football every Sunday.', options: ['plays', 'played', 'play', 'playing'], answer: 2, explanation: 'With they/we/I/you we use the base form. "They play" is correct.' },
      { id: 3, type: 'fillin', question: '___ she a doctor? (Is/Are/Am)', answer: 'Is', explanation: 'With he/she/it we use "Is" to form a question.' },
      { id: 4, type: 'multiple', question: 'I ___ breakfast every morning.', options: ['eat', 'eats', 'eating', 'ate'], answer: 0, explanation: 'With I we use the base form. "I eat" is correct.' },
      { id: 5, type: 'fillin', question: 'He ___ to school by bus. (go/goes/going)', answer: 'goes', explanation: 'With he/she/it we add -es to verbs ending in o, s, x, ch, sh.' },
    ]
  },
  {
    id: 2,
    level: 'basic',
    topic: 'Past Simple',
    title: 'Past Simple — Completed Actions',
    questions: [
      { id: 1, type: 'multiple', question: 'Yesterday I ___ to the market.', options: ['go', 'going', 'went', 'goes'], answer: 2, explanation: '"Go" is irregular. The past simple form is "went".' },
      { id: 2, type: 'fillin', question: 'She ___ a book last night. (read/reads/reading)', answer: 'read', explanation: '"Read" is irregular — past simple is also "read" but pronounced differently (red).' },
      { id: 3, type: 'multiple', question: 'They ___ a movie on Saturday.', options: ['watch', 'watches', 'watching', 'watched'], answer: 3, explanation: 'Regular verbs add -ed in past simple. "Watched" is correct.' },
      { id: 4, type: 'multiple', question: '___ he call you yesterday?', options: ['Do', 'Does', 'Did', 'Was'], answer: 2, explanation: 'For past simple questions we use "Did" + base form.' },
      { id: 5, type: 'fillin', question: 'I ___ very tired after work. (was/were/am)', answer: 'was', explanation: 'Past tense of "am/is" is "was". Past tense of "are" is "were".' },
    ]
  },
  {
    id: 3,
    level: 'basic',
    topic: 'Articles',
    title: 'Articles — a, an, the',
    questions: [
      { id: 1, type: 'multiple', question: 'I saw ___ elephant at the zoo.', options: ['a', 'an', 'the', 'no article'], answer: 1, explanation: 'We use "an" before words that start with a vowel sound (a, e, i, o, u).' },
      { id: 2, type: 'multiple', question: 'She is ___ doctor.', options: ['a', 'an', 'the', 'no article'], answer: 0, explanation: 'We use "a" before consonant sounds when talking about one person/thing.' },
      { id: 3, type: 'fillin', question: 'Please close ___ door. (a/an/the)', answer: 'the', explanation: 'We use "the" when both speaker and listener know which thing we mean.' },
      { id: 4, type: 'multiple', question: 'I have ___ umbrella.', options: ['a', 'an', 'the', 'no article'], answer: 1, explanation: '"Umbrella" starts with a vowel sound so we use "an".' },
      { id: 5, type: 'fillin', question: '___ sun rises in the east. (A/An/The)', answer: 'The', explanation: 'We use "the" for things that are unique — there is only one sun.' },
    ]
  },
  {
    id: 4,
    level: 'basic',
    topic: 'Vocabulary',
    title: 'Common Opposites',
    questions: [
      { id: 1, type: 'multiple', question: '"Hot" is the opposite of:', options: ['Warm', 'Cold', 'Cool', 'Dry'], answer: 1, explanation: '"Cold" is the direct opposite of "hot".' },
      { id: 2, type: 'multiple', question: '"Fast" is the opposite of:', options: ['Quiet', 'Small', 'Slow', 'Light'], answer: 2, explanation: '"Slow" is the direct opposite of "fast".' },
      { id: 3, type: 'multiple', question: '"Happy" is the opposite of:', options: ['Tired', 'Angry', 'Sad', 'Bored'], answer: 2, explanation: '"Sad" is the direct opposite of "happy".' },
      { id: 4, type: 'multiple', question: '"Big" is the opposite of:', options: ['Tall', 'Long', 'Heavy', 'Small'], answer: 3, explanation: '"Small" is the direct opposite of "big".' },
      { id: 5, type: 'multiple', question: '"Old" is the opposite of:', options: ['Young', 'New', 'Short', 'Thin'], answer: 0, explanation: '"Young" is the opposite of "old" for people. "New" is the opposite for things.' },
    ]
  },
  {
    id: 5,
    level: 'basic',
    topic: 'Prepositions',
    title: 'Basic Prepositions — on, in, at',
    questions: [
      { id: 1, type: 'multiple', question: 'The book is ___ the table.', options: ['in', 'on', 'at', 'under'], answer: 1, explanation: 'We use "on" for surfaces — on the table, on the floor, on the wall.' },
      { id: 2, type: 'multiple', question: 'She is ___ school right now.', options: ['on', 'in', 'at', 'from'], answer: 2, explanation: 'We use "at" for locations like at school, at work, at home.' },
      { id: 3, type: 'fillin', question: 'The keys are ___ my bag. (on/in/at)', answer: 'in', explanation: 'We use "in" for enclosed spaces — in the bag, in the box, in the room.' },
      { id: 4, type: 'multiple', question: 'I was born ___ 1999.', options: ['on', 'in', 'at', 'by'], answer: 1, explanation: 'We use "in" with years and months. "In 1999", "in March".' },
      { id: 5, type: 'fillin', question: 'The meeting is ___ 3 o\'clock. (on/in/at)', answer: 'at', explanation: 'We use "at" with specific times. "At 3 o\'clock", "at noon", "at midnight".' },
    ]
  },
  {
    id: 6,
    level: 'elementary',
    topic: 'Present Continuous',
    title: 'Present Continuous — Right Now',
    questions: [
      { id: 1, type: 'multiple', question: 'She ___ dinner right now.', options: ['cook', 'cooks', 'is cooking', 'cooked'], answer: 2, explanation: 'Present continuous = am/is/are + verb-ing. For actions happening right now.' },
      { id: 2, type: 'fillin', question: 'They ___ football at the moment. (play/are playing/plays)', answer: 'are playing', explanation: 'With they we use "are" + verb-ing for present continuous.' },
      { id: 3, type: 'multiple', question: '___ you listening to me?', options: ['Do', 'Does', 'Are', 'Is'], answer: 2, explanation: 'Questions in present continuous use am/is/are at the start.' },
      { id: 4, type: 'multiple', question: 'I ___ a book this week.', options: ['read', 'reads', 'am reading', 'was reading'], answer: 2, explanation: 'Present continuous is also used for temporary situations "this week/month".' },
      { id: 5, type: 'fillin', question: 'He ___ not working today. (is/are/am)', answer: 'is', explanation: 'Negative present continuous: am/is/are + not + verb-ing.' },
    ]
  },
  {
    id: 7,
    level: 'elementary',
    topic: 'Comparatives',
    title: 'Comparatives — Comparing Two Things',
    questions: [
      { id: 1, type: 'multiple', question: 'An elephant is ___ than a cat.', options: ['big', 'bigger', 'biggest', 'more big'], answer: 1, explanation: 'Short adjectives add -er for comparatives. big → bigger.' },
      { id: 2, type: 'multiple', question: 'This test is ___ than the last one.', options: ['more difficult', 'difficulter', 'most difficult', 'difficult'], answer: 0, explanation: 'Long adjectives (3+ syllables) use "more" instead of -er.' },
      { id: 3, type: 'fillin', question: 'She is ___ than her sister. (tall/taller/tallest)', answer: 'taller', explanation: 'When comparing two people/things we use comparative (-er or more).' },
      { id: 4, type: 'multiple', question: 'Today is ___ than yesterday.', options: ['hot', 'hotter', 'hottest', 'more hot'], answer: 1, explanation: 'For short adjectives ending consonant-vowel-consonant, double the last letter: hot → hotter.' },
      { id: 5, type: 'fillin', question: 'This bag is ___ than that one. (heavy/heavier/heaviest)', answer: 'heavier', explanation: 'Adjectives ending in -y change to -ier for comparatives. heavy → heavier.' },
    ]
  },
  {
    id: 8,
    level: 'elementary',
    topic: 'Modal Verbs',
    title: 'Modal Verbs — can, must, should',
    questions: [
      { id: 1, type: 'multiple', question: 'You ___ wear a seatbelt. It\'s the law.', options: ['can', 'should', 'must', 'might'], answer: 2, explanation: '"Must" expresses strong obligation or necessity.' },
      { id: 2, type: 'multiple', question: 'She ___ speak three languages.', options: ['must', 'should', 'can', 'has to'], answer: 2, explanation: '"Can" expresses ability — something a person is able to do.' },
      { id: 3, type: 'fillin', question: 'You look tired. You ___ go to bed early. (must/should/can)', answer: 'should', explanation: '"Should" gives advice or a recommendation, not a strict rule.' },
      { id: 4, type: 'multiple', question: '___ I use your phone?', options: ['Must', 'Should', 'Can', 'Has'], answer: 2, explanation: '"Can" is used to ask for permission in informal situations.' },
      { id: 5, type: 'fillin', question: 'You ___ smoke in this building. It\'s not allowed. (can\'t/shouldn\'t/mustn\'t)', answer: "mustn't", explanation: '"Mustn\'t" means it is prohibited — you are not allowed to do it.' },
    ]
  },
]
