import { useAuth } from '../../context/AuthContext'

export default function Navbar({ onDemo }: { onDemo: () => void }) {
  const { user, logout, isLoading } = useAuth()

  return (
    <nav className="bg-forest sticky top-0 z-50 px-7 py-3.5 flex justify-between items-center">
      <a href="/" className="font-serif text-gold-light text-2xl font-black hover:opacity-90 transition-opacity">
        BurmaLingo
      </a>

      <div className="flex gap-2 items-center">
        {/* Keep Try Demo for quick access to the writing practice page */}
        <button
          onClick={onDemo}
          className="hidden sm:block text-white/70 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          Try Demo
        </button>

        {isLoading ? null : user ? (
          // ── Logged in ──
          <>
            <a
              href="/profile"
              className="hidden sm:block text-white/80 text-sm font-medium hover:text-white transition-colors truncate max-w-[140px]"
            >
              {user.name || user.email.split('@')[0]}
            </a>
            <button
              onClick={logout}
              className="text-white/80 text-sm font-medium px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            >
              Log Out
            </button>
          </>
        ) : (
          // ── Logged out ──
          <>
            <a
              href="/login"
              className="text-white/80 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Log In
            </a>
            <a
              href="/register"
              className="bg-yellow-600 text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Start Free →
            </a>
          </>
        )}
      </div>
    </nav>
  )
}
