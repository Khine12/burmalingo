import { useEffect, useState } from 'react'
import { Filter } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import {
  listeningApi,
  type ListeningAttemptResult,
  type ListeningAudioDetail,
  type ListeningAudioOut,
  type ListeningLevel,
  type ListeningQuestionOut,
} from '../api/client'
import { awardXP } from './DashboardPage'
import { isQuotaExceededError, LIMIT_MESSAGES } from '../utils/limits'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Beginner',
  elementary: 'Elementary',
  pre_intermediate: 'Pre-Intermediate',
  intermediate: 'Intermediate',
  upper_intermediate: 'Upper-Intermediate',
  ielts_preparation: 'IELTS Prep',
}

// Matches the level palette used on General Reading / General Writing / Grammar
// (forest, gold, red, blue, purple) so the same level always reads as the same
// color across the app — plus a distinct slate for the IELTS-only level.
export const LEVEL_COLOR: Record<string, string> = {
  beginner: '#1B4332',
  elementary: '#C8941A',
  pre_intermediate: '#dc2626',
  intermediate: '#2563eb',
  upper_intermediate: '#9333ea',
  ielts_preparation: '#475569',
}

// ── Question block ───────────────────────────────────────────────────────────
function QuestionBlock({
  question,
  index,
  value,
  onChange,
  result,
  disabled,
}: {
  question: ListeningQuestionOut
  index: number
  value: string
  onChange: (val: string) => void
  result: { is_correct: boolean; correct_answer: string } | null
  disabled: boolean
}) {
  const borderColor = result ? (result.is_correct ? 'border-forest/40' : 'border-red-300') : 'border-bark/10'

  return (
    <div className={`bg-white rounded-xl border ${borderColor} p-4 space-y-3`}>
      <div className="flex items-start gap-2">
        <span className="text-xs font-bold text-bark-light shrink-0">{index + 1}.</span>
        <p className="text-sm font-medium text-bark leading-snug">{question.prompt}</p>
        {result && (
          <span className="ml-auto shrink-0 text-base">{result.is_correct ? '✅' : '❌'}</span>
        )}
      </div>

      {question.type === 'fill_blank' && (
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={e => onChange(e.target.value)}
          placeholder="Type your answer"
          className="w-full border border-bark/15 rounded-lg px-3 py-2 text-sm text-bark disabled:bg-bark/4 focus:outline-none focus:ring-2 focus:ring-forest/30"
        />
      )}

      {question.type === 'true_false' && (
        <div className="flex gap-2">
          {['True', 'False'].map(opt => (
            <button
              key={opt}
              disabled={disabled}
              onClick={() => onChange(opt)}
              className={`flex-1 text-sm font-semibold px-3 py-2 rounded-lg border transition-colors ${
                value === opt
                  ? 'bg-forest text-white border-forest'
                  : 'bg-white text-bark border-bark/15 hover:border-forest/30'
              } disabled:cursor-not-allowed`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === 'mcq' && (
        <div className="space-y-1.5">
          {(question.options ?? []).map(opt => (
            <label
              key={opt}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                value === opt
                  ? 'bg-forest/8 border-forest/40 text-bark'
                  : 'bg-white border-bark/15 text-bark hover:border-forest/30'
              } ${disabled ? 'cursor-not-allowed' : ''}`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={value === opt}
                disabled={disabled}
                onChange={() => onChange(opt)}
                className="accent-forest"
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {result && !result.is_correct && (
        <p className="text-xs text-bark-light">
          Correct answer: <span className="font-semibold text-bark">{result.correct_answer}</span>
        </p>
      )}
    </div>
  )
}

// ── Lesson player ────────────────────────────────────────────────────────────
function ListeningPlayer({ audioId, onBack }: { audioId: number; onBack: () => void }) {
  type Phase = 'loading' | 'ready' | 'submitting' | 'submitted' | 'limit' | 'error'
  const [phase, setPhase] = useState<Phase>('loading')
  const [detail, setDetail] = useState<ListeningAudioDetail | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<ListeningAttemptResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    listeningApi.getAudio(audioId)
      .then(res => { setDetail(res.data); setPhase('ready') })
      .catch(() => { setErrorMsg('Could not load this lesson. Please try again.'); setPhase('error') })
  }, [audioId])

  function setAnswer(questionId: number, val: string) {
    setAnswers(prev => ({ ...prev, [questionId]: val }))
  }

  async function submit() {
    if (!detail) return
    setPhase('submitting')
    try {
      const res = await listeningApi.submitAttempt(detail.id, answers)
      setResult(res.data)
      awardXP()
      setPhase('submitted')
    } catch (err) {
      if (isQuotaExceededError(err)) {
        setPhase('limit')
      } else {
        setErrorMsg('Could not submit your answers. Please try again.')
        setPhase('error')
      }
    }
  }

  function tryAgain() {
    setAnswers({})
    setResult(null)
    setErrorMsg('')
    setPhase('ready')
  }

  const resultByQuestion = new Map((result?.results ?? []).map(r => [r.question_id, r]))
  const scoreColor = (pct: number) => (pct >= 80 ? '#1B4332' : pct >= 60 ? '#b45309' : '#c1440e')

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-bark-light hover:text-bark transition-colors"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Back to lessons
      </button>

      {phase === 'loading' && (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />
        </div>
      )}

      {phase === 'error' && !detail && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center space-y-1">
          <p className="text-sm text-red-600">{errorMsg}</p>
        </div>
      )}

      {detail && (
        <>
          <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: LEVEL_COLOR[detail.level] ?? '#1a3a2a' }}
              >
                {LEVEL_LABEL[detail.level] ?? detail.level}
              </span>
            </div>
            <p className="text-bark font-medium leading-relaxed">{detail.title}</p>
            <audio
              controls
              src={detail.audio_url}
              className="w-full"
              controlsList="nodownload nofullscreen noremoteplayback"
              onContextMenu={e => e.preventDefault()}
              {...{ disablePictureInPicture: true }}
            />
          </div>

          {phase === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-sm text-red-600">{errorMsg}</p>
            </div>
          )}

          {phase === 'limit' && (
            <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-8 text-center space-y-3">
              <p className="text-3xl">🔒</p>
              <h2 className="font-serif text-lg font-bold text-bark">Free Limit Reached</h2>
              <p className="text-bark-light text-sm leading-relaxed">{LIMIT_MESSAGES.listening}</p>
              <a
                href="/pricing"
                className="block w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors"
              >
                Upgrade to Pro →
              </a>
            </div>
          )}

          {phase === 'submitted' && result && (
            <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-6 text-center space-y-1">
              <p className="text-6xl font-bold font-serif" style={{ color: scoreColor(result.score) }}>
                {Math.round(result.score)}
              </p>
              <p className="text-xs text-bark-light">
                {result.results.filter(r => r.is_correct).length} of {result.results.length} correct
              </p>
            </div>
          )}

          {phase !== 'limit' && (
            <>
              <div className="space-y-3">
                {detail.questions.map((q, i) => (
                  <QuestionBlock
                    key={q.id}
                    question={q}
                    index={i}
                    value={answers[q.id] ?? ''}
                    onChange={val => setAnswer(q.id, val)}
                    result={resultByQuestion.get(q.id) ?? null}
                    disabled={phase === 'submitting' || phase === 'submitted'}
                  />
                ))}
              </div>

              {(phase === 'ready' || phase === 'submitting') && (
                <button
                  onClick={submit}
                  disabled={phase === 'submitting'}
                  className="w-full bg-forest text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-forest/90 transition-colors disabled:opacity-60"
                >
                  {phase === 'submitting' ? 'Submitting…' : 'Submit answers'}
                </button>
              )}

              {phase === 'submitted' && (
                <button
                  onClick={tryAgain}
                  className="w-full border border-bark/15 text-bark text-sm font-semibold px-4 py-3 rounded-xl hover:bg-bark/4 transition-colors"
                >
                  Try again
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

// ── Lesson card ───────────────────────────────────────────────────────────────
function LessonCard({ audio, onClick }: { audio: ListeningAudioOut; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-bark/10 rounded-xl p-4 text-left hover:border-forest/30 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-bark leading-snug group-hover:text-forest transition-colors flex-1">
          {audio.title}
        </p>
        <span
          className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white mt-0.5"
          style={{ backgroundColor: LEVEL_COLOR[audio.level] ?? '#1a3a2a' }}
        >
          {LEVEL_LABEL[audio.level] ?? audio.level}
        </span>
      </div>
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export interface ListeningPracticePageProps {
  title: string
  subtitle: string
  /** Levels this page is scoped to. Lessons outside this set are never shown. */
  scopeLevels: ListeningLevel[]
  /** Pills to render for filtering within scopeLevels. Omit/empty to skip the filter row (e.g. a single-level scope). */
  levelPills?: { id: ListeningLevel; label: string }[]
  backHref: string
}

export default function ListeningPracticePage({ title, subtitle, scopeLevels, levelPills, backHref }: ListeningPracticePageProps) {
  const { user } = useAuth()
  const [audios, setAudios] = useState<ListeningAudioOut[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [activeLevel, setActiveLevel] = useState<ListeningLevel | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    // A single-level scope can be filtered server-side; a multi-level scope
    // (e.g. General Listening) fetches everything and filters client-side.
    const fetchLevel = scopeLevels.length === 1 ? scopeLevels[0] : undefined
    listeningApi.listAudios(fetchLevel)
      .then(res => {
        const scoped = fetchLevel ? res.data : res.data.filter(a => scopeLevels.includes(a.level))
        setAudios(scoped)
        setLoading(false)
      })
      .catch(() => { setLoadError(true); setLoading(false) })
  }, [user])

  if (!user) { navigate('/login'); return null }

  const filtered = activeLevel ? audios.filter(a => a.level === activeLevel) : audios

  const header = (showBack: boolean) => (
    <header className="bg-forest border-b border-forest-mid sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate(backHref)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Back"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <span className="font-serif font-bold text-xl text-yellow-400">BurmaLingo</span>
      </div>
    </header>
  )

  // ── Player view ─────────────────────────────────────────────────────────
  if (selectedId !== null) {
    return (
      <div className="min-h-screen bg-cream font-sans">
        {header(false)}
        <main className="max-w-2xl mx-auto px-6 py-8">
          <ListeningPlayer audioId={selectedId} onBack={() => setSelectedId(null)} />
        </main>
      </div>
    )
  }

  // ── Lesson list view ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream font-sans">
      {header(true)}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-bark">{title}</h1>
          <p className="text-bark-light text-sm mt-1">{subtitle}</p>
        </div>

        {levelPills && levelPills.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 -mx-6 px-6">
            <Filter className="w-4 h-4 shrink-0 text-bark-light" aria-hidden="true" />
            <button
              onClick={() => setActiveLevel(null)}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                activeLevel === null
                  ? 'bg-forest text-white'
                  : 'bg-white border border-bark/15 text-bark hover:border-forest/30'
              }`}
            >
              All
            </button>
            {levelPills.map(lvl => (
              <button
                key={lvl.id}
                onClick={() => setActiveLevel(activeLevel === lvl.id ? null : lvl.id)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  activeLevel === lvl.id
                    ? 'text-white'
                    : 'bg-white border border-bark/15 text-bark hover:border-forest/30'
                }`}
                style={activeLevel === lvl.id ? { backgroundColor: LEVEL_COLOR[lvl.id] } : undefined}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />
          </div>
        )}

        {loadError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
            <p className="text-sm text-red-600">Could not load lessons. Please try again.</p>
          </div>
        )}

        {!loading && !loadError && filtered.length === 0 && (
          <p className="text-sm text-bark-light text-center py-8">No lessons available at this level yet.</p>
        )}

        {!loading && !loadError && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map(audio => (
              <LessonCard key={audio.id} audio={audio} onClick={() => setSelectedId(audio.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
