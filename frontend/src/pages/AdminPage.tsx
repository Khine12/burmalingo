import { useState } from 'react'

const API = 'https://burmalingo-production.up.railway.app/api'

type Tab = 'feedback' | 'users' | 'manage'

interface FeedbackItem {
  id: number
  email: string | null
  message: string
  created_at: string
}

interface UserItem {
  id: number
  email: string
  tier: string
  created_at: string
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('feedback')

  // Feedback
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])
  const [feedbackLoading, setFeedbackLoading] = useState(false)

  // Users
  const [users, setUsers] = useState<UserItem[]>([])
  const [usersLoading, setUsersLoading] = useState(false)

  // Manage
  const [upgradeEmail, setUpgradeEmail] = useState('')
  const [downgradeEmail, setDowngradeEmail] = useState('')
  const [upgradeMsg, setUpgradeMsg] = useState('')
  const [downgradeMsg, setDowngradeMsg] = useState('')
  const [manageLoading, setManageLoading] = useState<'up' | 'down' | null>(null)

  async function handleLogin() {
    if (!key.trim()) return
    setAuthed(true)
    loadFeedback(key)
  }

  async function loadFeedback(k: string) {
    setFeedbackLoading(true)
    try {
      const res = await fetch(`${API}/feedback/list?admin_key=${encodeURIComponent(k)}`)
      if (!res.ok) { setAuthed(false); return }
      setFeedback(await res.json())
    } finally {
      setFeedbackLoading(false)
    }
  }

  async function loadUsers(k: string) {
    setUsersLoading(true)
    try {
      const res = await fetch(`${API}/admin/users?admin_key=${encodeURIComponent(k)}`)
      if (res.ok) setUsers(await res.json())
    } finally {
      setUsersLoading(false)
    }
  }

  function switchTab(t: Tab) {
    setTab(t)
    if (t === 'feedback' && feedback.length === 0) loadFeedback(key)
    if (t === 'users' && users.length === 0) loadUsers(key)
  }

  async function handleUpgrade() {
    if (!upgradeEmail.trim()) return
    setManageLoading('up')
    setUpgradeMsg('')
    try {
      const res = await fetch(`${API}/admin/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: upgradeEmail.trim(), admin_key: key }),
      })
      const data = await res.json()
      setUpgradeMsg(res.ok ? `✓ ${data.email} upgraded to Pro` : `✗ ${data.detail}`)
      if (res.ok) { setUpgradeEmail(''); setUsers([]) }
    } catch {
      setUpgradeMsg('✗ Network error')
    } finally {
      setManageLoading(null)
    }
  }

  async function handleDowngrade() {
    if (!downgradeEmail.trim()) return
    setManageLoading('down')
    setDowngradeMsg('')
    try {
      const res = await fetch(`${API}/admin/downgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: downgradeEmail.trim(), admin_key: key }),
      })
      const data = await res.json()
      setDowngradeMsg(res.ok ? `✓ ${data.email} downgraded to Free` : `✗ ${data.detail}`)
      if (res.ok) { setDowngradeEmail(''); setUsers([]) }
    } catch {
      setDowngradeMsg('✗ Network error')
    } finally {
      setManageLoading(null)
    }
  }

  // ── Login ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-8 w-full max-w-sm space-y-4">
          <h1 className="font-serif text-2xl font-bold text-bark text-center">Admin</h1>
          <input
            type="password"
            value={key}
            onChange={e => setKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Admin key"
            className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream font-sans">
      <header className="bg-forest sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <span className="font-serif text-yellow-400 text-xl font-black">BurmaLingo Admin</span>
          <button
            onClick={() => { setAuthed(false); setKey('') }}
            className="text-white/60 hover:text-white text-xs transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-bark/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex gap-0">
          {(['feedback', 'users', 'manage'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors capitalize ${
                tab === t ? 'border-forest text-forest' : 'border-transparent text-bark-light hover:text-bark'
              }`}
            >
              {t === 'manage' ? 'Upgrade / Downgrade' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Feedback tab */}
        {tab === 'feedback' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-bark">Feedback ({feedback.length})</h2>
              <button onClick={() => loadFeedback(key)} className="text-xs text-bark-light hover:text-bark underline">Refresh</button>
            </div>
            {feedbackLoading ? (
              <p className="text-bark-light text-sm">Loading...</p>
            ) : feedback.length === 0 ? (
              <p className="text-bark-light text-sm">No feedback yet.</p>
            ) : (
              feedback.map(f => (
                <div key={f.id} className="bg-white rounded-xl border border-bark/10 shadow-sm px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-bark-light">{f.email || 'Anonymous'}</span>
                    <span className="text-xs text-bark-light/60">{new Date(f.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className="text-sm text-bark leading-relaxed">{f.message}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-bark">Users ({users.length})</h2>
              <button onClick={() => loadUsers(key)} className="text-xs text-bark-light hover:text-bark underline">Refresh</button>
            </div>
            {usersLoading ? (
              <p className="text-bark-light text-sm">Loading...</p>
            ) : (
              <div className="bg-white rounded-xl border border-bark/10 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-bark/5 border-b border-bark/10">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold text-bark-light uppercase tracking-wider">ID</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-bark-light uppercase tracking-wider">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-bark-light uppercase tracking-wider">Tier</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-bark-light uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bark/8">
                    {users.map(u => (
                      <tr key={u.id} className={u.tier === 'pro' ? 'bg-yellow-50' : ''}>
                        <td className="px-4 py-3 text-bark-light tabular-nums">{u.id}</td>
                        <td className="px-4 py-3 text-bark font-medium">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            u.tier === 'pro' ? 'bg-yellow-100 text-yellow-700' : 'bg-bark/8 text-bark-light'
                          }`}>{u.tier}</span>
                        </td>
                        <td className="px-4 py-3 text-bark-light text-xs tabular-nums">
                          {new Date(u.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Manage tab */}
        {tab === 'manage' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Upgrade */}
            <div className="bg-white rounded-xl border border-bark/10 shadow-sm p-6 space-y-4">
              <h3 className="font-serif font-bold text-bark">Upgrade to Pro</h3>
              <input
                type="email"
                value={upgradeEmail}
                onChange={e => setUpgradeEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25"
              />
              <button
                onClick={handleUpgrade}
                disabled={manageLoading === 'up'}
                className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors disabled:opacity-50"
              >
                {manageLoading === 'up' ? 'Upgrading...' : 'Upgrade to Pro'}
              </button>
              {upgradeMsg && (
                <p className={`text-sm font-medium ${upgradeMsg.startsWith('✓') ? 'text-forest' : 'text-red-600'}`}>{upgradeMsg}</p>
              )}
            </div>

            {/* Downgrade */}
            <div className="bg-white rounded-xl border border-bark/10 shadow-sm p-6 space-y-4">
              <h3 className="font-serif font-bold text-bark">Downgrade to Free</h3>
              <input
                type="email"
                value={downgradeEmail}
                onChange={e => setDowngradeEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25"
              />
              <button
                onClick={handleDowngrade}
                disabled={manageLoading === 'down'}
                className="w-full py-3 bg-red-700 text-white font-bold text-sm rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {manageLoading === 'down' ? 'Downgrading...' : 'Downgrade to Free'}
              </button>
              {downgradeMsg && (
                <p className={`text-sm font-medium ${downgradeMsg.startsWith('✓') ? 'text-forest' : 'text-red-600'}`}>{downgradeMsg}</p>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
