// BurmaLingo — starter speaking topics
// One combined Speaking feature, split into two tracks (everyday + IELTS).
// Drop into the frontend (e.g. src/data/speaking_topics.ts) and import on the
// speaking page. Adjust to match your existing topic-data shape if needed.

export type SpeakingTopic = {
  id: string;
  track: "everyday" | "ielts";
  level: "beginner" | "intermediate" | "advanced";
  prompt: string;
  hint?: string; // shown under the prompt to guide the learner
};

export const speakingTopics: SpeakingTopic[] = [
  // --- Everyday English ---
  { id: "intro",      track: "everyday", level: "beginner",     prompt: "Introduce yourself.",                         hint: "Your name, where you're from, and what you do." },
  { id: "hometown",   track: "everyday", level: "beginner",     prompt: "Describe your hometown.",                     hint: "What it's like and what you like about it." },
  { id: "routine",    track: "everyday", level: "beginner",     prompt: "Talk about your daily routine.",              hint: "What you do from morning to night." },
  { id: "food",       track: "everyday", level: "beginner",     prompt: "Describe your favorite food.",                hint: "What it is and why you like it." },
  { id: "family",     track: "everyday", level: "beginner",     prompt: "Talk about your family.",                     hint: "Who they are and what they're like." },
  { id: "job",        track: "everyday", level: "intermediate", prompt: "Describe your job or your studies.",          hint: "What you do and how you feel about it." },
  { id: "hobby",      track: "everyday", level: "intermediate", prompt: "Talk about a hobby you enjoy.",               hint: "What it is and why you like it." },
  { id: "friend",     track: "everyday", level: "intermediate", prompt: "Describe your best friend.",                  hint: "Who they are and why you get along." },
  { id: "weekend",    track: "everyday", level: "intermediate", prompt: "How do you usually spend your weekends?",     hint: "Your typical activities and who with." },

  // --- IELTS Speaking ---
  { id: "place-visit", track: "ielts", level: "intermediate", prompt: "Describe a place you would like to visit.",   hint: "Where it is, why you want to go, and what you'd do there." },
  { id: "skill",       track: "ielts", level: "intermediate", prompt: "Describe a skill you would like to learn.",   hint: "What it is, why, and how you would learn it." },
  { id: "trip",        track: "ielts", level: "intermediate", prompt: "Describe a memorable trip or journey.",       hint: "Where you went, who with, and why it was memorable." },
  { id: "influence",   track: "ielts", level: "advanced",     prompt: "Describe a person who has influenced you.",   hint: "Who they are, how you know them, and how they influenced you." },
  { id: "book-film",   track: "ielts", level: "advanced",     prompt: "Describe a book or film that affected you.",  hint: "What it was, what it was about, and why it affected you." },
  { id: "tech-people", track: "ielts", level: "advanced",     prompt: "Does technology bring people closer together or push them apart? Explain your view.", hint: "Give reasons and real examples." },
  { id: "city-country",track: "ielts", level: "advanced",     prompt: "Is it better to live in a city or the countryside? Give reasons for your opinion.", hint: "Compare both sides, then give your view." },
];