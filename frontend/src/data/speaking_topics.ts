// BurmaLingo — speaking topics
// Organized by LEVEL (Basic → IELTS), matching the other skills.
// Drop into the frontend (e.g. src/data/speaking_topics.ts).
//
// NOTE: rename the `level` values below if your app's existing level labels
// differ (e.g. "beginner" instead of "basic") — just match what your other
// skills use so the speaking levels line up with the rest of the app.

export type SpeakingLevel =
  | "basic"
  | "elementary"
  | "intermediate"
  | "upper-intermediate"
  | "advanced"
  | "ielts";

export type SpeakingTopic = {
  id: string;
  level: SpeakingLevel;
  prompt: string;
  hint?: string; // shown under the prompt to guide the learner
};

// Order + display labels for rendering sections on the speaking page.
export const SPEAKING_LEVELS: { id: SpeakingLevel; label: string }[] = [
  { id: "basic",              label: "Basic" },
  { id: "elementary",         label: "Elementary" },
  { id: "intermediate",       label: "Intermediate" },
  { id: "upper-intermediate", label: "Upper-Intermediate" },
  { id: "advanced",           label: "Advanced" },
  { id: "ielts",              label: "IELTS Speaking" },
];

export const speakingTopics: SpeakingTopic[] = [
  // ---------------- BASIC ----------------
  { id: "intro",          level: "basic", prompt: "Introduce yourself.",                          hint: "Your name, your age, and where you are from." },
  { id: "where-live",     level: "basic", prompt: "Where do you live?",                           hint: "Your city and what your home is like." },
  { id: "family-basic",   level: "basic", prompt: "Talk about your family.",                      hint: "Who is in your family." },
  { id: "fav-food-basic", level: "basic", prompt: "What is your favorite food?",                  hint: "What it is and when you eat it." },
  { id: "daily-basic",    level: "basic", prompt: "What do you do every day?",                    hint: "Your simple daily routine." },
  { id: "fav-color",      level: "basic", prompt: "What is your favorite color and why?",         hint: "The color and where you see it." },
  { id: "pet",            level: "basic", prompt: "Do you have a pet, or do you want one?",       hint: "What animal, and why." },
  { id: "weather-today",  level: "basic", prompt: "What is the weather like today?",              hint: "Describe today's weather in a few sentences." },
  { id: "fav-day",        level: "basic", prompt: "What is your favorite day of the week?",       hint: "The day and what you usually do." },
  { id: "free-basic",     level: "basic", prompt: "What do you like to do in your free time?",    hint: "One or two activities you enjoy." },

  // ---------------- ELEMENTARY ----------------
  { id: "house",          level: "elementary", prompt: "Describe your house or your room.",       hint: "The rooms and what is inside." },
  { id: "best-friend-el", level: "elementary", prompt: "Tell me about your best friend.",         hint: "Who they are and what you do together." },
  { id: "last-weekend",   level: "elementary", prompt: "What did you do last weekend?",           hint: "Use the past tense to describe it." },
  { id: "hometown-el",    level: "elementary", prompt: "Describe your hometown.",                 hint: "Where it is and what is good about it." },
  { id: "hobby-el",       level: "elementary", prompt: "Talk about a hobby you enjoy.",           hint: "What it is and how often you do it." },
  { id: "morning",        level: "elementary", prompt: "Describe your morning routine.",          hint: "What you do before noon." },
  { id: "fav-season",     level: "elementary", prompt: "What is your favorite season?",           hint: "Why you like it and what you do then." },
  { id: "get-to-work",    level: "elementary", prompt: "How do you get to work or school?",       hint: "Your usual journey and how long it takes." },
  { id: "cook-eat",       level: "elementary", prompt: "A food you like to cook or eat.",         hint: "How you make it or where you get it." },
  { id: "weekend-plans",  level: "elementary", prompt: "What are your plans for next weekend?",   hint: "Use the future ('I'm going to...')." },

  // ---------------- INTERMEDIATE ----------------
  { id: "memorable-day",  level: "intermediate", prompt: "Describe a memorable day in your life.",        hint: "What happened and how you felt." },
  { id: "place-visited",  level: "intermediate", prompt: "Talk about a place you have visited.",          hint: "Where it was and what you did there." },
  { id: "fav-movie",      level: "intermediate", prompt: "Describe your favorite movie or TV show.",      hint: "What it is about and why you like it." },
  { id: "person-admire",  level: "intermediate", prompt: "Describe a person you admire.",                 hint: "Who they are and why you admire them." },
  { id: "goals-year",     level: "intermediate", prompt: "What are your goals for this year?",            hint: "What you want to achieve and why." },
  { id: "learn-english",  level: "intermediate", prompt: "Why is learning English important to you?",     hint: "Your personal reasons." },
  { id: "tradition",      level: "intermediate", prompt: "Describe a tradition or festival in your country.", hint: "What people do and what it means." },
  { id: "ideal-job",      level: "intermediate", prompt: "Describe your ideal job.",                      hint: "What it is and why it suits you." },
  { id: "city-problem",   level: "intermediate", prompt: "Talk about a problem in your city.",            hint: "The problem and a possible solution." },
  { id: "compare-two",    level: "intermediate", prompt: "Compare two cities or two seasons.",            hint: "Their main differences and which you prefer." },

  // ---------------- UPPER-INTERMEDIATE ----------------
  { id: "challenge",      level: "upper-intermediate", prompt: "Describe a challenge you overcame.",              hint: "The situation and how you handled it." },
  { id: "social-media",   level: "upper-intermediate", prompt: "How does social media affect our lives?",        hint: "Talk about both good and bad effects." },
  { id: "skill-develop",  level: "upper-intermediate", prompt: "A skill you want to develop, and why.",          hint: "How you plan to improve it." },
  { id: "tech-daily",     level: "upper-intermediate", prompt: "How has technology changed daily life?",         hint: "Give specific examples." },
  { id: "friendship-q",   level: "upper-intermediate", prompt: "What makes a good friendship?",                  hint: "The qualities that matter most." },
  { id: "proud-achieve",  level: "upper-intermediate", prompt: "Describe an achievement you are proud of.",      hint: "What you did and why it matters to you." },
  { id: "city-tradeoffs", level: "upper-intermediate", prompt: "The advantages and disadvantages of living in a big city.", hint: "Weigh both sides." },
  { id: "influential",    level: "upper-intermediate", prompt: "A book or film that influenced your thinking.",  hint: "What it changed about how you see things." },
  { id: "good-leader",    level: "upper-intermediate", prompt: "What makes a good leader?",                      hint: "The qualities you value and why." },
  { id: "change-path",    level: "upper-intermediate", prompt: "Would you change your job or studies if you could? Why?", hint: "Explain your reasoning." },

  // ---------------- ADVANCED ----------------
  { id: "money-happy",    level: "advanced", prompt: "Does money bring happiness? Explain your view.",            hint: "Argue your position with examples." },
  { id: "gov-education",  level: "advanced", prompt: "What role should the government play in education?",         hint: "Take a clear position and defend it." },
  { id: "globalization",  level: "advanced", prompt: "How does globalization affect local culture?",              hint: "Discuss both benefits and costs." },
  { id: "tech-relations", level: "advanced", prompt: "Does technology improve or harm human relationships?",      hint: "Defend your view with reasons." },
  { id: "degree-worth",   level: "advanced", prompt: "Is a university degree still worth it today?",              hint: "Give reasons for and against." },
  { id: "environment",    level: "advanced", prompt: "What responsibility do individuals have for the environment?", hint: "Suggest concrete actions." },
  { id: "work-life",      level: "advanced", prompt: "Is work-life balance realistic in modern society?",         hint: "Build a clear argument." },
  { id: "media-opinion",  level: "advanced", prompt: "How does the media shape public opinion?",                  hint: "Explain the mechanisms and the risks." },
  { id: "failure-needed", level: "advanced", prompt: "Is failure necessary for success?",                         hint: "Argue your case with examples." },
  { id: "ai-ethics",      level: "advanced", prompt: "What are the main ethical concerns around AI?",             hint: "Identify key issues and give your view." },

  // ---------------- IELTS ----------------
  // Part 2 (cue-card style: speak for ~2 minutes)
  { id: "ielts-place",     level: "ielts", prompt: "Describe a place you would like to visit.",        hint: "Where it is, why you want to go, and what you would do there." },
  { id: "ielts-person",    level: "ielts", prompt: "Describe a person who has influenced you.",        hint: "Who they are, how you know them, and how they influenced you." },
  { id: "ielts-skill",     level: "ielts", prompt: "Describe a skill you would like to learn.",        hint: "What it is, why, and how you would learn it." },
  { id: "ielts-journey",   level: "ielts", prompt: "Describe a memorable journey you have taken.",      hint: "Where you went, who with, and why it was memorable." },
  { id: "ielts-book-film", level: "ielts", prompt: "Describe a book or film that affected you.",        hint: "What it was, what it was about, and why it affected you." },
  { id: "ielts-goal",      level: "ielts", prompt: "Describe a goal you hope to achieve.",              hint: "What it is, why it matters, and your plan to reach it." },
  { id: "ielts-advice",    level: "ielts", prompt: "Describe a piece of useful advice you received.",   hint: "Who gave it, what it was, and how it helped you." },
  { id: "ielts-decision",  level: "ielts", prompt: "Describe an important decision you made.",          hint: "The decision, why you made it, and the outcome." },
  { id: "ielts-help",      level: "ielts", prompt: "Describe a time you helped someone.",               hint: "The situation, how you helped, and how it felt." },
  { id: "ielts-gift",      level: "ielts", prompt: "Describe a gift you gave or received.",             hint: "What it was, the occasion, and why it mattered." },
  // Part 3 (discussion / opinion)
  { id: "ielts-tech-disc", level: "ielts", prompt: "Do you think technology brings people closer together or pushes them apart?", hint: "Discuss both sides with examples, then give your view." },
  { id: "ielts-city-vs",   level: "ielts", prompt: "Is it better to live in a city or the countryside?", hint: "Compare both, then give your opinion with reasons." },
];