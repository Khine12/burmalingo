import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

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

function streakMessage(n: number) {
  if (n === 0)   return 'Start your streak today!'
  if (n === 1)   return '1 day — keep it going!'
  if (n >= 30)   return `${n} days — legendary! 🏆`
  if (n >= 14)   return `${n} days — incredible! 🔥`
  if (n >= 7)    return `${n} days — on fire! 🔥`
  if (n >= 3)    return `${n} days — great streak!`
  return         `${n} days — building momentum!`
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
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-serif font-bold text-xl text-bark">BurmaLingo</span>
          <div className="flex items-center gap-3">
            {user.tier === 'pro' && (
              <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full">★ Pro</span>
            )}
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full bg-forest text-white text-sm font-bold flex items-center justify-center hover:bg-forest-mid transition-colors"
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

          {/* Top row — streak / total XP / weekly XP */}
          <div className="grid grid-cols-3 divide-x divide-bark/8">
            <div className="px-5 py-5 text-center">
              <div className="text-3xl mb-1">{xpData.streak > 0 ? '🔥' : '💤'}</div>
              <p className="font-serif text-2xl font-bold text-bark">{xpData.streak}</p>
              <p className="text-[11px] text-bark-light mt-0.5">day streak</p>
              <p className="text-[10px] text-bark-light/60 mt-1 leading-snug">{streakMessage(xpData.streak)}</p>
            </div>

            <div className="px-5 py-5 text-center">
              <div className="text-3xl mb-1">⚡</div>
              <p className="font-serif text-2xl font-bold text-bark">{xpData.totalXP}</p>
              <p className="text-[11px] text-bark-light mt-0.5">total XP</p>
              <p className="text-[10px] text-bark-light/60 mt-1">{XP_PER_SESSION} XP per session</p>
            </div>

            <div className="px-5 py-5 text-center">
              <div className="text-3xl mb-1">🎯</div>
              <p className="font-serif text-2xl font-bold text-bark">
                {xpData.weeklyXP}<span className="text-sm font-normal text-bark-light">/{WEEKLY_GOAL_XP}</span>
              </p>
              <p className="text-[11px] text-bark-light mt-0.5">weekly XP</p>
              <p className="text-[10px] text-bark-light/60 mt-1">
                {xpData.weeklyXP >= WEEKLY_GOAL_XP ? '🎉 Goal reached!' : `${WEEKLY_GOAL_XP - xpData.weeklyXP} XP to go`}
              </p>
            </div>
          </div>

          {/* Weekly progress bar */}
          <div className="px-5 pb-4">
            <div className="h-2.5 bg-bark/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  weeklyPct >= 100 ? 'bg-forest' : weeklyPct >= 60 ? 'bg-forest/70' : 'bg-gold'
                }`}
                style={{ width: `${weeklyPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <p className="text-[10px] text-bark-light">Weekly goal: {WEEKLY_GOAL_XP} XP</p>
              <p className="text-[10px] text-bark-light">{Math.round(weeklyPct)}% complete</p>
            </div>
          </div>

          {/* Level bar */}
          <div className="border-t border-bark/8 px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-bark-light uppercase tracking-wider">Level {levelInfo.level}</span>
                <span className="text-xs font-semibold text-bark">{levelInfo.name}</span>
              </div>
              {levelInfo.level < 6 && (
                <span className="text-[11px] text-bark-light">{xpData.totalXP} / {levelInfo.next} XP</span>
              )}
            </div>
            <div className="h-2 bg-bark/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gold transition-all duration-700"
                style={{ width: `${Math.min((xpData.totalXP / levelInfo.next) * 100, 100)}%` }}
              />
            </div>
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
    </div>
  )
}
