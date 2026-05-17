import { useState } from 'react'
import { feedbackApi } from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function FeedbackButton() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!message.trim() || message.trim().length < 5) return
    setLoading(true)
    try {
      await feedbackApi.submit(message.trim(), user?.email)
      setSent(true)
      setMessage('')
      setTimeout(() => { setSent(false); setOpen(false) }, 2000)
    } catch {
      // silently fail — feedback is best-effort
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-forest text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg hover:bg-forest/90 transition-colors flex items-center gap-2"
      >
        💬 Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-bark">Share your feedback</h3>
              <button onClick={() => setOpen(false)} className="text-bark-light hover:text-bark text-sm">✕</button>
            </div>
            {sent ? (
              <div className="text-center py-4">
                <p className="text-2xl mb-2">🎉</p>
                <p className="font-semibold text-forest">Thank you! We read every suggestion.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-bark-light">What would you like to see improved or added to BurmaLingo?</p>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Your suggestion or feedback..."
                  rows={4}
                  className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30 resize-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={message.trim().length < 5 || loading}
                  className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors disabled:opacity-30"
                >
                  {loading ? 'Sending...' : 'Send Feedback'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
