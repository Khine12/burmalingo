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

export default api
