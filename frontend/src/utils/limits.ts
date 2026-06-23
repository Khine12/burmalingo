const FREE_LIMITS = {
  writing: { max: 3, days: 14 },
  reading: { max: 3, days: 14 },
  grammar: { max: 1, days: 7 },
  vocab: { max: 1, days: 7 },
}

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().split('T')[0]
}

function getTwoWeekStart(): string {
  const now = new Date()
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
  const period = Math.floor(dayOfYear / 14)
  const start = new Date(now.getFullYear(), 0, period * 14)
  return start.toISOString().split('T')[0]
}

interface UsageData {
  count: number
  periodStart: string
}

function loadUsage(key: string, periodStart: string): UsageData {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return { count: 0, periodStart }
    const data = JSON.parse(raw) as UsageData
    if (data.periodStart !== periodStart) return { count: 0, periodStart }
    return data
  } catch {
    return { count: 0, periodStart }
  }
}

function saveUsage(key: string, data: UsageData) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function canUse(feature: 'writing' | 'reading' | 'grammar' | 'vocab', isPro: boolean): boolean {
  if (isPro) return true
  const periodStart = feature === 'writing' || feature === 'reading' ? getTwoWeekStart() : getWeekStart()
  const key = `bl_${feature}_usage`
  const usage = loadUsage(key, periodStart)
  return usage.count < FREE_LIMITS[feature].max
}

export function recordUsage(feature: 'writing' | 'reading' | 'grammar' | 'vocab') {
  const periodStart = feature === 'writing' || feature === 'reading' ? getTwoWeekStart() : getWeekStart()
  const key = `bl_${feature}_usage`
  const usage = loadUsage(key, periodStart)
  usage.count += 1
  saveUsage(key, usage)
}

export function getRemaining(feature: 'writing' | 'reading' | 'grammar' | 'vocab', isPro: boolean): number {
  if (isPro) return 999
  const periodStart = feature === 'writing' || feature === 'reading' ? getTwoWeekStart() : getWeekStart()
  const key = `bl_${feature}_usage`
  const usage = loadUsage(key, periodStart)
  return Math.max(0, FREE_LIMITS[feature].max - usage.count)
}

export function canTakeLevelTest(isPro: boolean): boolean {
  if (isPro) return true
  return localStorage.getItem('bl_level_test_done') !== 'true'
}

export function recordLevelTestDone() {
  localStorage.setItem('bl_level_test_done', 'true')
}

export const LIMIT_MESSAGES = {
  writing: 'You have used your 3 free writing submissions for this period. Upgrade to Pro for unlimited writing with AI feedback.',
  reading: 'You have used your 3 free reading passages for this period. Upgrade to Pro for unlimited reading.',
  grammar: 'You have used your 1 free grammar lesson for this week. Upgrade to Pro for unlimited grammar practice.',
  vocab: 'You have used your 1 free vocabulary lesson for this week. Upgrade to Pro for unlimited vocabulary practice.',
  listening: 'You have used your 1 free listening lesson for this week. Upgrade to Pro for unlimited listening practice.',
  levelTest: 'You have already taken the level test. Upgrade to Pro to retake it anytime.',
}

// The backend rejects over-limit requests with 429 and a
// { error: 'quota_exceeded', used, limit, window_days } detail body (see
// writing_quota.py / listening_quota.py). This is the source of truth —
// client-side canUse()/recordUsage() above are only a same-tab UI nicety and
// can drift (cleared storage, another device, stale period math), so every
// page that hits a metered endpoint must check this on catch.
export function isQuotaExceededError(err: unknown): boolean {
  const e = err as { response?: { status?: number; data?: { detail?: { error?: string } } } }
  return e?.response?.status === 429 && e?.response?.data?.detail?.error === 'quota_exceeded'
}
