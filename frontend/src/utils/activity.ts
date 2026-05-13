export function getToday(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getWeekStart(): string {
  const d = new Date()
  const day = d.getDay() // 0=Sun
  const diff = day === 0 ? -6 : 1 - day
  const mon = new Date(d)
  mon.setDate(d.getDate() + diff)
  return `${mon.getFullYear()}-${String(mon.getMonth() + 1).padStart(2, '0')}-${String(mon.getDate()).padStart(2, '0')}`
}

/** Increment a `{ weekStart, count }` JSON key, resetting when the week rolls over. */
export function incrementWeeklyKey(key: string) {
  const weekStart = getWeekStart()
  try {
    const raw    = localStorage.getItem(key)
    const stored = raw ? (JSON.parse(raw) as { weekStart: string; count: number }) : { weekStart: '', count: 0 }
    const next   = stored.weekStart === weekStart
      ? { weekStart, count: stored.count + 1 }
      : { weekStart, count: 1 }
    localStorage.setItem(key, JSON.stringify(next))
  } catch {
    localStorage.setItem(key, JSON.stringify({ weekStart, count: 1 }))
  }
}

/** Increment a plain integer total key. */
export function incrementTotalKey(key: string) {
  const n = parseInt(localStorage.getItem(key) ?? '0', 10)
  localStorage.setItem(key, String(n + 1))
}

/**
 * Update the day streak. Call once per completed practice.
 * Increments streak if yesterday was last active, resets to 1 if longer gap,
 * no-ops if already active today.
 */
export function updateActivity() {
  const today      = getToday()
  const lastActive = localStorage.getItem('burmalingo_last_active') ?? ''
  const streak     = parseInt(localStorage.getItem('burmalingo_streak') ?? '0', 10)

  if (lastActive !== today) {
    const yesterday = (() => {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    })()
    localStorage.setItem('burmalingo_streak',      String(lastActive === yesterday ? streak + 1 : 1))
    localStorage.setItem('burmalingo_last_active', today)
  }
}
