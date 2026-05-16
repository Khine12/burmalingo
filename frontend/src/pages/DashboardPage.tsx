import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getWeekStart } from '../utils/activity'

// ── Storage helpers ──────────────────────────────────────────────────
function weeklyCount(key: string): number {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return 0
    const { weekStart, count } = JSON.parse(raw) as { weekStart: string; count: number }
    return weekStart === getWeekStart() ? count : 0
  } catch { return 0 }
}

interface Stats {
  essaysWeek:    number
  readingsWeek:  number
  totalEssays:   number
  totalReadings: number
  streak:        number
}

function readStats(): Stats {
  return {
    essaysWeek:    weeklyCount('burmalingo_essays_week'),
    readingsWeek:  weeklyCount('burmalingo_reading_count_week'),
    totalEssays:   parseInt(localStorage.getItem('burmalingo_usage') ?? '0', 10),
    totalReadings: parseInt(localStorage.getItem('burmalingo_reading_total') ?? '0', 10),
    streak:        parseInt(localStorage.getItem('burmalingo_streak') ?? '0', 10),
  }
}

function streakMessage(n: number): string {
  if (n === 0) return 'Start your streak today!'
  if (n === 1) return '1 day — keep it going!'
  if (n >= 7)  return `${n} day streak — incredible!`
  if (n >= 3)  return `${n} day streak — you're on fire!`
  return `${n} day streak`
}

function goalMessage(n: number): string {
  if (n >= 5) return 'Weekly goal reached!'
  if (n === 4) return 'Almost there — one more!'
  if (n >= 2) return 'Good momentum this week'
  if (n === 1) return 'Great start!'
  return 'Complete 5 sessions to hit your goal'
}

function initials(name: string) {
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

const categories = [
  {
    icon: '🎓',
    title: 'IELTS Preparation',
    desc: 'Writing, Reading & Listening',
    href: '/ielts',
    bg: '#1a3a2a',
    text: '#ffffff',
  },
  {
    icon: '📝',
    title: 'Grammar Practice',
    desc: 'Basic to Advanced lessons',
    href: '/grammar',
    bg: '#b45309',
    text: '#ffffff',
  },
  {
    icon: '📖',
    title: 'General Reading',
    desc: 'Passages by level',
    href: '/reading',
    bg: '#c1440e',
    text: '#ffffff',
  },
  {
    icon: '✍️',
    title: 'General Writing',
    desc: 'Writing by level',
    href: '/writing-general',
    bg: '#c1440e',
    text: '#ffffff',
  },
  {
    icon: '💬',
    title: 'Vocabulary & Daily English',
    desc: 'Phrases, words & speaking',
    href: '/vocabulary',
    bg: '#5b3d6e',
    text: '#ffffff',
  },
  {
    icon: '🎯',
    title: 'Level Test',
    desc: 'Find your starting level',
    href: '/level-test',
    bg: '#ffffff',
    text: '#2d1f14',
    border: true,
  },
]

// ── Page ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth()
  const [stats]    = useState<Stats>(readStats)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) window.location.href = '/login'
  }, [isLoading, user])

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  if (isLoading || !user) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-forest border-t-transparent animate-spin" />
    </div>
  )

  const firstName   = (user.name || user.email).split(/[\s@]/)[0]
  const displayName = user.name || user.email.split('@')[0]
  const today       = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const weeklyTotal = stats.essaysWeek + stats.readingsWeek
  const weekPct     = Math.min((weeklyTotal / 5) * 100, 100)

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Navbar ── */}
      <header className="bg-forest sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="font-serif text-gold-light text-2xl font-black">BurmaLingo</span>
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setMenuOpen(o => !o) }}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Account menu"
            >
              <span className="text-white text-[11px] font-bold leading-none">{initials(displayName)}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-bark/10 py-1.5 w-36 z-20">
                <a href="/profile" className="block px-4 py-2 text-sm text-bark hover:bg-bark/5 transition-colors">Profile</a>
                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Log Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* ── Welcome ── */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-bark">Welcome back, {firstName}!</h1>
          <p className="text-bark-light text-sm mt-0.5">{today}</p>
        </div>

        {/* ── Upgrade banner ── */}
        {user.tier === 'free' && (
          <div className="flex items-center justify-between bg-forest/10 border border-forest/20 rounded-xl px-5 py-3.5">
            <div>
              <p className="text-sm font-semibold text-bark">You're on the Free plan</p>
              <p className="text-xs text-bark-light mt-0.5">Unlock unlimited practice + AI feedback</p>
            </div>
            <a
              href="/pricing"
              className="shrink-0 ml-4 bg-forest text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        )}

        {/* ── Activity card ── */}
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm px-6 py-5">
          <div className="flex items-start justify-between gap-6">
            {/* Streak */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-3xl leading-none">{stats.streak > 0 ? '🔥' : '💤'}</span>
              <div className="min-w-0">
                <p className="font-serif text-2xl font-bold text-bark leading-none">{stats.streak}</p>
                <p className="text-xs text-bark-light mt-0.5 truncate">{streakMessage(stats.streak)}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-bark/10 self-stretch hidden sm:block" />

            {/* Weekly progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-bark">This week</p>
                <p className="text-xs font-bold text-bark tabular-nums">{Math.min(weeklyTotal, 5)} / 5</p>
              </div>
              <div className="h-2 bg-bark/8 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    weeklyTotal >= 5 ? 'bg-forest' : weeklyTotal >= 3 ? 'bg-forest/70' : 'bg-gold'
                  }`}
                  style={{ width: `${weekPct}%` }}
                />
              </div>
              <p className="text-[11px] text-bark-light">{goalMessage(weeklyTotal)}</p>
            </div>

            {/* Divider */}
            <div className="w-px bg-bark/10 self-stretch hidden sm:block" />

            {/* Totals */}
            <div className="flex gap-5 shrink-0">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-bark leading-none">{stats.totalEssays}</p>
                <p className="text-[11px] text-bark-light mt-0.5">essays</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-bark leading-none">{stats.totalReadings}</p>
                <p className="text-[11px] text-bark-light mt-0.5">passages</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Practice categories ── */}
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
                  <p
                    className="font-semibold text-sm leading-snug"
                    style={{ color: c.text }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="text-xs mt-0.5 leading-snug"
                    style={{ color: c.border ? '#6b5744' : `${c.text}99` }}
                  >
                    {c.desc}
                  </p>
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
