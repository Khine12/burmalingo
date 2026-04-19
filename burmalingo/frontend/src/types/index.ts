// User & Auth
export interface User {
  id: number
  email: string
  tier: 'free' | 'pro'
  current_level: number
  created_at: string
}

export interface AuthTokens {
  access_token: string
  token_type: 'bearer'
}

// Levels
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface LevelInfo {
  n: Level
  name: string
  desc: string
  available: boolean
}

// Vocabulary
export type SRRating = 'hard' | 'good' | 'easy'

export interface VocabCard {
  id: number
  english: string
  pos: string
  definition: string
  example_sentence: string
  level: Level
}

export interface ReviewResult {
  card_id: number
  rating: SRRating
  next_review_at: string  // ISO datetime from SM-2 algorithm
  interval_days: number
  easiness_factor: number
}

// Translation Practice
export interface TranslationPrompt {
  id: number
  burmese: string
  hint: string
  level: Level
  model_answer: string
}

export interface TranslationFeedback {
  naturalVersion: string
  feedback: string
  tips: string[]
}

// Placement Test
export interface PlacementQuestion {
  q: string
  options: string[]
  answer: number
  level: Level
}

// Progress
export interface UserProgress {
  words_known: number
  current_streak: number
  retention_rate: number
  level_completion: Record<number, number>  // level -> % complete
}

// API responses
export interface ApiError {
  detail: string
}
