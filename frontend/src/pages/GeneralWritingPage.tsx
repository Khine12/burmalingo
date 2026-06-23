import { useState, useEffect } from 'react'
import { generalWritingApi } from '../api/client'
import { awardXP } from './DashboardPage'
import { useAuth } from '../context/AuthContext'
import { canUse, recordUsage, isQuotaExceededError, LIMIT_MESSAGES } from '../utils/limits'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

type Level = 'basic' | 'elementary' | 'pre-intermediate' | 'intermediate' | 'upper-intermediate'
type Phase = 'select' | 'write' | 'result'

interface Topic {
  id: number
  text: string
  outline: string | null
}

interface GradeResult {
  off_topic?: boolean
  message?: string
  stars?: number
  positive?: string
  improvements?: string[]
  model_answer?: string
}

const LEVEL_LABELS: Record<Level, string> = {
  'basic': 'Basic',
  'elementary': 'Elementary',
  'pre-intermediate': 'Pre-Intermediate',
  'intermediate': 'Intermediate',
  'upper-intermediate': 'Upper-Intermediate',
}

const LEVEL_MIN_WORDS: Record<Level, number> = {
  'basic': 30,
  'elementary': 50,
  'pre-intermediate': 80,
  'intermediate': 120,
  'upper-intermediate': 150,
}

export default function GeneralWritingPage() {
  const [level, setLevel] = useState<Level>('basic')
  const [topics, setTopics] = useState<Topic[]>([])
  const [phase, setPhase] = useState<Phase>('select')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [essay, setEssay] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GradeResult | null>(null)
  const [error, setError] = useState('')
  const [showOutline, setShowOutline] = useState(false)

  useEffect(() => {
    generalWritingApi.getTopics(level).then(res => setTopics(res.data))
  }, [level])

  const { user } = useAuth()
  const [limitBlocked, setLimitBlocked] = useState(false)
  const isPro = user?.tier === 'pro'

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length
  const minWords = LEVEL_MIN_WORDS[level]

  async function handleSubmit() {
    if (!selectedTopic) return
    if (!canUse('writing', isPro)) { setLimitBlocked(true); return }
    setLoading(true)
    setError('')
    try {
      const res = await generalWritingApi.gradeEssay(selectedTopic.text, essay, level)
      setResult(res.data)
      recordUsage('writing')
      awardXP()
      setPhase('result')
    } catch (err) {
      if (isQuotaExceededError(err)) {
        setLimitBlocked(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleTopicSelect(topic: Topic) {
    setSelectedTopic(topic)
    setEssay('')
    setResult(null)
    setShowOutline(false)
    setPhase('write')
  }

  function handleBack() {
    if (phase === 'write') { setPhase('select'); setSelectedTopic(null) }
    else if (phase === 'result') { setPhase('write') }
  }

  if (limitBlocked) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full text-center space-y-4">
        <p className="text-4xl">🔒</p>
        <h1 className="font-serif text-xl font-bold text-bark">Free Limit Reached</h1>
        <p className="text-bark-light text-sm leading-relaxed">{LIMIT_MESSAGES.writing}</p>
        <a href="/pricing" className="block w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors">
          Upgrade to Pro →
        </a>
        <button onClick={() => setLimitBlocked(false)} className="text-sm text-bark-light hover:text-bark transition-colors">
          Back
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* Header */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => phase === 'select' ? navigate('/dashboard') : handleBack()}
            className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {phase === 'select' ? 'Dashboard' : 'Back'}
          </button>
          <span className="font-serif font-bold text-bark">General Writing</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Topic Selection */}
      {phase === 'select' && (
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-bark">General Writing</h1>
            <p className="text-bark-light text-sm mt-1">Choose your level and a topic to practice writing.</p>
          </div>

          {/* Level filter */}
          <div className="flex gap-2 flex-wrap">
            {(['basic', 'elementary', 'pre-intermediate', 'intermediate', 'upper-intermediate'] as Level[]).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  level === l ? 'bg-forest text-white border-forest' : 'bg-white text-bark-light border-bark/20 hover:border-forest/40'
                }`}
              >
                {LEVEL_LABELS[l]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {topics.map((topic, i) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="text-left bg-white border border-bark/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bark/8 text-bark-light text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-bark group-hover:text-forest transition-colors leading-relaxed">{topic.text}</p>
                    {topic.outline && (
                      <span className="inline-block mt-2 text-xs text-forest font-semibold">📋 Outline provided</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Write Phase */}
      {phase === 'write' && selectedTopic && (
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">

          {/* Topic card */}
          <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                level === 'basic' ? 'bg-forest-pale text-forest' :
                level === 'elementary' ? 'bg-gold-pale text-gold' :
                level === 'pre-intermediate' ? 'bg-red-50 text-red-600' :
                level === 'intermediate' ? 'bg-blue-50 text-blue-600' :
                'bg-purple-50 text-purple-600'
              }`}>{LEVEL_LABELS[level]}</span>
            </div>
            <p className="text-bark font-medium leading-relaxed">{selectedTopic.text}</p>

            {selectedTopic.outline && (
              <div className="mt-4">
                <button
                  onClick={() => setShowOutline(o => !o)}
                  className="text-xs font-semibold text-forest hover:text-forest-mid transition-colors flex items-center gap-1"
                >
                  📋 {showOutline ? 'Hide outline' : 'Show writing outline'}
                </button>
                {showOutline && (
                  <div className="mt-3 bg-forest-pale rounded-xl p-4">
                    {selectedTopic.outline.split('\n').map((line, i) => (
                      <p key={i} className="text-sm text-forest leading-relaxed">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Textarea */}
          <div className="bg-white rounded-2xl border border-bark/10 shadow-sm overflow-hidden">
            <textarea
              value={essay}
              onChange={e => setEssay(e.target.value)}
              placeholder="Start writing here..."
              rows={12}
              className="w-full px-6 py-5 text-bark text-sm leading-relaxed resize-none focus:outline-none placeholder:text-bark/30"
            />
            <div className="px-6 py-3 border-t border-bark/8 flex items-center justify-between">
              <span className={`text-xs font-semibold tabular-nums ${wordCount >= minWords ? 'text-forest' : 'text-bark-light'}`}>
                {wordCount} / {minWords} words minimum
              </span>
              {wordCount >= minWords && (
                <span className="text-xs text-forest">✓ Ready to submit</span>
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || wordCount < minWords}
            className="w-full py-4 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting feedback...' : `Get Feedback →`}
          </button>
        </main>
      )}

      {/* Result Phase */}
      {phase === 'result' && result && selectedTopic && (
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">

          {result.off_topic ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-2xl mb-3">⚠️</p>
              <p className="font-semibold text-red-700 mb-1">Off Topic</p>
              <p className="text-sm text-red-600">{result.message}</p>
              <button
                onClick={() => setPhase('write')}
                className="mt-4 px-6 py-2.5 bg-red-700 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Stars */}
              <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-6 text-center">
                <div className="text-4xl mb-2">
                  {'⭐'.repeat(result.stars ?? 0)}{'☆'.repeat(3 - (result.stars ?? 0))}
                </div>
                <p className="font-serif text-lg font-bold text-bark">
                  {result.stars === 3 ? 'Excellent work!' : result.stars === 2 ? 'Good effort!' : 'Keep practising!'}
                </p>
                {result.positive && (
                  <p className="text-sm text-bark-light mt-2 leading-relaxed">{result.positive}</p>
                )}
              </div>

              {/* Improvements */}
              {result.improvements && result.improvements.length > 0 && (
                <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-6 space-y-3">
                  <h3 className="font-serif font-bold text-bark mb-4">Things to improve</h3>
                  {result.improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="flex-shrink-0 text-red-500 mt-0.5">✗</span>
                      <p className="text-bark-light leading-relaxed">{imp}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Model answer */}
              {result.model_answer && (
                <div className="bg-forest-pale border border-forest/20 rounded-2xl p-6">
                  <h3 className="font-serif font-bold text-forest mb-3">Model Answer</h3>
                  <p className="text-sm text-bark leading-relaxed">{result.model_answer}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setPhase('write')}
                  className="w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors shadow-sm"
                >
                  Try This Topic Again
                </button>
                <button
                  onClick={() => { setPhase('select'); setSelectedTopic(null) }}
                  className="w-full py-3.5 border-2 border-bark/15 text-bark-light text-sm font-semibold rounded-xl hover:bg-white hover:border-bark/25 hover:text-bark transition-all"
                >
                  Choose Another Topic
                </button>
              </div>
            </>
          )}
        </main>
      )}
    </div>
  )
}
