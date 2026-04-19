// SM-2 Spaced Repetition Algorithm — implemented from scratch
// Based on the original SuperMemo 2 algorithm by Piotr Wozniak

export type Rating = 'hard' | 'good' | 'easy'

export interface CardState {
  easiness_factor: number   // starts at 2.5, minimum 1.3
  interval_days: number     // days until next review
  repetitions: number       // how many times reviewed successfully
  next_review_at: Date
}

const QUALITY: Record<Rating, number> = {
  hard: 2,   // incorrect but remembered on hint
  good: 4,   // correct with some effort
  easy: 5,   // correct instantly
}

const MIN_EF = 1.3
const INITIAL_EF = 2.5

export function initCard(): CardState {
  return {
    easiness_factor: INITIAL_EF,
    interval_days: 1,
    repetitions: 0,
    next_review_at: new Date(),
  }
}

export function updateCard(card: CardState, rating: Rating): CardState {
  const q = QUALITY[rating]

  // Update easiness factor
  const newEF = Math.max(
    MIN_EF,
    card.easiness_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  )

  // Calculate next interval
  let newInterval: number
  let newRepetitions: number

  if (q < 3) {
    // Failed — reset to start
    newInterval = 1
    newRepetitions = 0
  } else {
    newRepetitions = card.repetitions + 1
    if (card.repetitions === 0) {
      newInterval = 1
    } else if (card.repetitions === 1) {
      newInterval = 6
    } else {
      newInterval = Math.round(card.interval_days * newEF)
    }
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInterval)

  return {
    easiness_factor: newEF,
    interval_days: newInterval,
    repetitions: newRepetitions,
    next_review_at: nextReview,
  }
}

// Returns true if the card is due for review today
export function isDue(card: CardState): boolean {
  return card.next_review_at <= new Date()
}

// Estimate retention % based on days since last review
export function estimateRetention(daysSinceReview: number, ef: number): number {
  // Simplified forgetting curve: R = e^(-t/S) where S = interval * EF
  const stability = ef * 10
  return Math.round(Math.exp(-daysSinceReview / stability) * 100)
}
