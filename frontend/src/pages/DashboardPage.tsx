import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import FeedbackButton from './FeedbackButton'

// ── XP Storage helpers ─────────────────────────────────────────────
const XP_PER_SESSION = 10
const WEEKLY_GOAL_XP = 50

function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

function getWeekStart() {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff)).toISOString().split('T')[0]
}

interface XPData {
  totalXP: number
  weeklyXP: number
  weekStart: string
  streak: number
  lastActivityDate: string
}

function loadXP(): XPData {
  try {
    const raw = localStorage.getItem('burmalingo_xp')
    if (!raw) return { totalXP: 0, weeklyXP: 0, weekStart: getWeekStart(), streak: 0, lastActivityDate: '' }
    const data = JSON.parse(raw) as XPData
    const weekStart = getWeekStart()
    if (data.weekStart !== weekStart) {
      data.weeklyXP = 0
      data.weekStart = weekStart
    }
    if (data.lastActivityDate) {
      const last = new Date(data.lastActivityDate)
      const today = new Date(getTodayKey())
      const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays > 1) data.streak = 0
    }
    return data
  } catch { return { totalXP: 0, weeklyXP: 0, weekStart: getWeekStart(), streak: 0, lastActivityDate: '' } }
}

export function awardXP() {
  const data = loadXP()
  const today = getTodayKey()
  data.totalXP += XP_PER_SESSION
  data.weeklyXP += XP_PER_SESSION
  if (data.lastActivityDate !== today) {
    const last = new Date(data.lastActivityDate || today)
    const now = new Date(today)
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
    data.streak = diffDays <= 1 ? data.streak + 1 : 1
    data.lastActivityDate = today
  }
  localStorage.setItem('burmalingo_xp', JSON.stringify(data))
}

function getLevel(totalXP: number) {
  if (totalXP < 100)  return { level: 1, name: 'Beginner',           next: 100 }
  if (totalXP < 250)  return { level: 2, name: 'Elementary',          next: 250 }
  if (totalXP < 500)  return { level: 3, name: 'Pre-Intermediate',    next: 500 }
  if (totalXP < 1000) return { level: 4, name: 'Intermediate',        next: 1000 }
  if (totalXP < 2000) return { level: 5, name: 'Upper-Intermediate',  next: 2000 }
  return               { level: 6, name: 'IELTS Ready',               next: 99999 }
}

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function initials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

const categories = [
  { icon: '🎓', title: 'IELTS Preparation',       desc: 'Writing, Reading & Listening', href: '/ielts',          bg: '#1a3a2a', text: '#ffffff' },
  { icon: '📝', title: 'Grammar Practice',         desc: 'Basic to Advanced lessons',    href: '/grammar',        bg: '#b45309', text: '#ffffff' },
  { icon: '📖', title: 'General Reading',          desc: 'Passages by level',            href: '/reading',        bg: '#c1440e', text: '#ffffff' },
  { icon: '✍️', title: 'General Writing',          desc: 'Writing by level',             href: '/writing-general',bg: '#c1440e', text: '#ffffff' },
  { icon: '💬', title: 'Vocabulary & Daily English',desc: 'Phrases, words & speaking',   href: '/vocabulary',     bg: '#5b3d6e', text: '#ffffff' },
  { icon: '🎯', title: 'Level Test',               desc: 'Find your starting level',     href: '/level-test',     bg: '#ffffff', text: '#2d1f14', border: true },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [xpData, setXpData] = useState<XPData>({ totalXP: 0, weeklyXP: 0, weekStart: '', streak: 0, lastActivityDate: '' })

  useEffect(() => {
    setXpData(loadXP())
  }, [])

  if (isLoading) return <div className="min-h-screen bg-cream" />
  if (!user) { navigate('/login'); return null }

  const displayName = user.name || user.email.split('@')[0]
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const weeklyPct = Math.min((xpData.weeklyXP / WEEKLY_GOAL_XP) * 100, 100)
  const levelInfo = getLevel(xpData.totalXP)

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* Header */}
      <header className="bg-forest border-b border-forest-mid sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif font-bold text-xl text-yellow-400">BurmaLingo</span>
          <div className="flex items-center gap-3">
            {user.tier === 'pro' && (
              <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">★ Pro</span>
            )}
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-bold flex items-center justify-center transition-colors"
            >
              {initials(displayName)}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Welcome */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-bark">Welcome back, {displayName}!</h1>
          <p className="text-bark-light text-sm mt-0.5">{today}</p>
        </div>

        {/* Upgrade banner */}
        {user.tier === 'free' && (
          <div className="flex items-center justify-between bg-forest/10 border border-forest/20 rounded-xl px-5 py-3.5">
            <div>
              <p className="text-sm font-semibold text-bark">You're on the Free plan</p>
              <p className="text-xs text-bark-light mt-0.5">Unlock unlimited practice + AI feedback</p>
            </div>
            <a href="/pricing" className="shrink-0 ml-4 bg-forest text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors">
              Upgrade to Pro
            </a>
          </div>
        )}

        {/* XP Activity Card */}
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm overflow-hidden">
          <div className="flex items-center divide-x divide-bark/8">
            <div className="flex-1 px-4 py-3 text-center">
              <p className="text-lg">{xpData.streak > 0 ? '🔥' : '💤'}</p>
              <p className="font-serif text-xl font-bold text-bark leading-none mt-0.5">{xpData.streak}</p>
              <p className="text-[10px] text-bark-light mt-0.5">day streak</p>
            </div>
            <div className="flex-1 px-4 py-3 text-center">
              <p className="text-lg">⚡</p>
              <p className="font-serif text-xl font-bold text-bark leading-none mt-0.5">{xpData.totalXP}</p>
              <p className="text-[10px] text-bark-light mt-0.5">total XP</p>
            </div>
            <div className="flex-1 px-4 py-3 text-center">
              <p className="text-lg">🎯</p>
              <p className="font-serif text-xl font-bold text-bark leading-none mt-0.5">{xpData.weeklyXP}<span className="text-xs font-normal text-bark-light">/{WEEKLY_GOAL_XP}</span></p>
              <p className="text-[10px] text-bark-light mt-0.5">this week</p>
            </div>
            <div className="flex-1 px-4 py-3 text-center">
              <p className="text-lg">🏆</p>
              <p className="font-serif text-xl font-bold text-bark leading-none mt-0.5">Lv.{levelInfo.level}</p>
              <p className="text-[10px] text-bark-light mt-0.5">{xpData.totalXP}/{levelInfo.next} XP</p>
            </div>
          </div>
          <div className="px-4 pb-3">
            <div className="h-1.5 bg-bark/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${weeklyPct >= 100 ? 'bg-forest' : weeklyPct >= 60 ? 'bg-forest/70' : 'bg-gold'}`}
                style={{ width: `${weeklyPct}%` }}
              />
            </div>
            <p className="text-[10px] text-bark-light mt-1">{xpData.weeklyXP >= WEEKLY_GOAL_XP ? '🎉 Weekly goal reached!' : `${WEEKLY_GOAL_XP - xpData.weeklyXP} XP to reach weekly goal`}</p>
          </div>
        </div>

        {/* Practice categories */}
        <section>
          <h2 className="font-serif text-lg font-bold text-bark mb-4">Practice</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((c) => (
              <a
                key={c.href}
                href={c.href}
                style={{
                  backgroundColor: c.bg,
                  color: c.text,
                  border: c.border ? '1.5px solid rgba(45,31,20,0.15)' : undefined,
                }}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
              >
                <span className="text-2xl leading-none">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm leading-snug" style={{ color: c.text }}>{c.title}</p>
                  <p className="text-xs mt-0.5 leading-snug" style={{ color: c.border ? '#6b5744' : `${c.text}99` }}>{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-bark-light pb-4">More features coming July 2026</p>
      </main>
      <FeedbackButton />
    </div>
  )
}
