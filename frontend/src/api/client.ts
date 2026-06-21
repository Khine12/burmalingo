import axios from 'axios'
import type { AuthTokens, User, VocabCard, ReviewResult, TranslationFeedback, UserProgress } from '../types'

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:8000/api'
  : 'https://burmalingo-production.up.railway.app/api'

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

// Auth
export const authApi = {
  register: (email: string, password: string, name: string) =>
    api.post<User>('/auth/register', { email, password, name }),

  login: (email: string, password: string) => {
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    return api.post<AuthTokens>('/auth/token', form, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },

  me: () => api.get<User>('/auth/me'),
}

// Vocabulary
export const vocabApi = {
  getDueCards: (level: number) =>
    api.get<VocabCard[]>('/vocab/due', { params: { level } }),

  submitReview: (cardId: number, rating: string) =>
    api.post<ReviewResult>('/vocab/review', { card_id: cardId, rating }),
}

// Translation practice
export const translationApi = {
  getPrompt: (level: number) =>
    api.get('/translation/prompt', { params: { level } }),

  checkTranslation: (promptId: number, userAnswer: string, userLevel: number) =>
    api.post<TranslationFeedback>('/translation/check', {
      prompt_id: promptId,
      user_answer: userAnswer,
      user_level: userLevel,
    }),
}

// Progress
export const progressApi = {
  get: () => api.get<UserProgress>('/progress'),
}

// IELTS Writing practice
export const writingApi = {
  getTopics: () => api.get<{ id: number; text: string }[]>('/writing/topics'),

  gradeEssay: (topic: string, essay: string) =>
    api.post('/writing/grade', { topic, essay }),
}

// Stripe
export const stripeApi = {
  createCheckoutSession: () =>
    api.post<{ url: string }>('/payments/create-checkout'),

  getPortalUrl: () =>
    api.post<{ url: string }>('/payments/portal'),
}

// Feedback
export const feedbackApi = {
  submit: (message: string, email?: string) =>
    api.post('/feedback/submit', { message, email }),
}

// General Writing practice
export const generalWritingApi = {
  getTopics: (level: string) =>
    api.get<{ id: number; text: string; outline: string | null }[]>(`/general-writing/topics/${level}`),
  gradeEssay: (topic: string, essay: string, level: string) =>
    api.post('/general-writing/grade', { topic, essay, level }),
}

// Speaking
export interface SpeakingQuota {
  is_pro: boolean
  used?: number
  limit: number
  period_end?: string | null
  subscription_expired?: boolean
}

export interface SpeakingResult {
  transcript: string
  pronunciation_score: number | null
  accuracy_score: number | null
  fluency_score: number | null
  completeness_score: number | null
  prosody_score: number | null
  overall_score: number | null
  scored_at: string
  quota: { used: number; limit: number; period_end: string | null }
}

export const speakingApi = {
  getQuota: () => api.get<SpeakingQuota>('/speaking/quota'),

  // Uses fetch instead of the axios instance so the browser can set
  // Content-Type: multipart/form-data with the correct boundary itself.
  // The axios instance's default Content-Type: application/json would otherwise
  // override the boundary and cause FastAPI to return 422.
  assess: async (audio: Blob, promptText: string): Promise<{ data: SpeakingResult }> => {
    const form = new FormData()
    form.append('audio', audio, audio.type.includes('mp4') ? 'recording.mp4' : 'recording.webm')
    form.append('prompt_text', promptText)

    const token = localStorage.getItem('access_token')
    const res = await fetch(`${baseURL}/speaking/assess`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    })

    if (!res.ok) {
      const body: unknown = await res.json().catch(() => ({}))
      const err = new Error(String(res.status)) as Error & { response: unknown }
      err.response = { status: res.status, data: body }
      throw err
    }

    return { data: await res.json() as SpeakingResult }
  },
}

// Listening
export type ListeningLevel = 'beginner' | 'elementary' | 'pre_intermediate' | 'intermediate' | 'upper_intermediate' | 'ielts_preparation'
export type ListeningQuestionType = 'fill_blank' | 'true_false' | 'mcq'

export interface ListeningAudioOut {
  id: number
  title: string
  level: ListeningLevel
  created_at: string
}

export interface ListeningQuestionOut {
  id: number
  type: ListeningQuestionType
  prompt: string
  options: string[] | null
  order: number
}

export interface ListeningAudioDetail {
  id: number
  title: string
  level: ListeningLevel
  transcript: string
  audio_url: string
  created_at: string
  questions: ListeningQuestionOut[]
}

export interface ListeningAttemptResultItem {
  question_id: number
  is_correct: boolean
  correct_answer: string
}

export interface ListeningAttemptResult {
  score: number
  results: ListeningAttemptResultItem[]
}

export const listeningApi = {
  listAudios: (level?: ListeningLevel) =>
    api.get<ListeningAudioOut[]>('/listening/audios', { params: level ? { level } : {} }),

  getAudio: (id: number) =>
    api.get<ListeningAudioDetail>(`/listening/audios/${id}`),

  submitAttempt: (id: number, answers: Record<number, string>) =>
    api.post<ListeningAttemptResult>(`/listening/audios/${id}/attempt`, { answers }),
}

export default api
