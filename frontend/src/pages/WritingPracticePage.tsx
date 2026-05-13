import { useState, useEffect, useMemo, useRef } from 'react'
import { writingApi } from '../api/client'
import { updateActivity, incrementWeeklyKey } from '../utils/activity'

interface Topic {
  id: number
  text: string
}

interface GradingResult {
  overall_band: number
  task_achievement: number
  coherence_cohesion: number
  lexical_resource: number
  grammatical_range_accuracy: number
  improvements: string[]
}

const CRITERIA = [
  { key: 'task_achievement' as const,           label: 'Task Achievement' },
  { key: 'coherence_cohesion' as const,         label: 'Coherence & Cohesion' },
  { key: 'lexical_resource' as const,           label: 'Lexical Resource' },
  { key: 'grammatical_range_accuracy' as const, label: 'Grammatical Range & Accuracy' },
]

const BAND_DESCRIPTORS: [number, string][] = [
  [8.5, 'Expert User'],
  [7.5, 'Very Good User'],
  [6.5, 'Good User'],
  [5.5, 'Competent User'],
  [4.5, 'Modest User'],
  [3.5, 'Limited User'],
  [0,   'Developing User'],
]

function bandDescriptor(score: number) {
  return BAND_DESCRIPTORS.find(([min]) => score >= min)?.[1] ?? 'Developing User'
}

function bandText(score: number) {
  if (score >= 7.0) return 'text-forest'
  if (score >= 5.5) return 'text-gold'
  return 'text-red-600'
}

function bandBar(score: number) {
  if (score >= 7.0) return 'bg-forest'
  if (score >= 5.5) return 'bg-gold'
  return 'bg-red-400'
}

function bandBorder(score: number) {
  if (score >= 7.0) return 'border-forest'
  if (score >= 5.5) return 'border-gold'
  return 'border-red-400'
}

// ── Icons ─────────────────────────────────────────────────────────────
function IconArrowLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function IconSpinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  )
}

function IconLightbulb({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14h6.18z" />
    </svg>
  )
}

function IconTrendUp({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function IconPencil({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

const IMPROVEMENT_ICONS = [
  { Icon: IconLightbulb, bg: 'bg-gold-pale',    color: 'text-gold' },
  { Icon: IconTrendUp,   bg: 'bg-forest-pale',  color: 'text-forest' },
  { Icon: IconPencil,    bg: 'bg-bark/[0.07]',  color: 'text-bark-mid' },
]

// ── Sub-components ─────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  return (
    <div className="h-1.5 bg-bark/10 rounded-full overflow-hidden mt-2.5">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${bandBar(score)}`}
        style={{ width: `${(score / 9) * 100}%` }}
      />
    </div>
  )
}

function StepBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
      active ? 'bg-forest text-white' : 'bg-bark/10 text-bark-light'
    }`}>
      {n}
    </span>
  )
}

// ── Page ───────────────────────────────────────────────────────────────
export default function WritingPracticePage({ onBack }: { onBack: () => void }) {
  const [topics, setTopics]               = useState<Topic[]>([])
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null)
  const [essay, setEssay]                 = useState('')
  const [isGrading, setIsGrading]         = useState(false)
  const [result, setResult]               = useState<GradingResult | null>(null)
  const [error, setError]                 = useState<string | null>(null)
  const submittingRef                     = useRef(false)

  const wordCount = useMemo(
    () => (essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length),
    [essay],
  )

  useEffect(() => {
    writingApi.getTopics().then(res => setTopics(res.data))
  }, [])

  const selectedTopic = topics.find(t => t.id === selectedTopicId) ?? null
  const canSubmit     = !!selectedTopic && wordCount >= 250 && !isGrading

  async function handleGrade() {
    if (!selectedTopic || wordCount < 250 || submittingRef.current) return
    submittingRef.current = true
    setIsGrading(true)
    setResult(null)
    setError(null)
    try {
      const res = await writingApi.gradeEssay(selectedTopic.text, essay)
      setResult(res.data)
      // Dashboard: increment total essay count
      const totalCount = parseInt(localStorage.getItem('burmalingo_usage') ?? '0', 10)
      localStorage.setItem('burmalingo_usage', String(totalCount + 1))
      // Dashboard: track personal best band score
      const prevBest = parseFloat(localStorage.getItem('burmalingo_highest_band') ?? '0')
      if (res.data.overall_band > prevBest) {
        localStorage.setItem('burmalingo_highest_band', String(res.data.overall_band))
      }
      updateActivity()
      incrementWeeklyKey('burmalingo_essays_week')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      submittingRef.current = false
      setIsGrading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setEssay('')
    setSelectedTopicId(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // word count helper text
  const wordCountLabel = wordCount >= 250
    ? '✓ Ready to submit'
    : wordCount > 0
      ? `${250 - wordCount} words to go`
      : 'Minimum 250 words'

  const wordCountColor = wordCount >= 250
    ? 'text-forest'
    : wordCount > 0
      ? 'text-gold'
      : 'text-bark-light'

  return (
    <div className="min-h-screen bg-cream text-bark font-sans">

      {/* ── Sticky header ── */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-bark-light hover:text-bark transition-colors text-sm"
          >
            <IconArrowLeft />
            Home
          </button>
          <span className="font-serif font-bold text-bark tracking-tight">BurmaLingo</span>
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-widest text-gold uppercase">
            <IconStar />
            IELTS Practice
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        {/* ── Hero ── */}
        <div className="text-center space-y-2 pb-2">
          <p className="text-xs font-semibold tracking-widest text-forest uppercase">Writing Task 2</p>
          <h1 className="font-serif text-4xl font-bold text-bark">IELTS Essay Grader</h1>
          <p className="text-bark-light text-sm max-w-sm mx-auto leading-relaxed">
            Select an exam question, write your response, and receive instant band score feedback calibrated to official IELTS descriptors.
          </p>
        </div>

        {/* ── Step 1: Topic ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <StepBadge n={1} active={true} />
            <h2 className="text-xs font-semibold tracking-widest text-bark uppercase">Select a Question</h2>
          </div>

          <select
            value={selectedTopicId ?? ''}
            onChange={e => { setSelectedTopicId(Number(e.target.value)); setResult(null) }}
            className="w-full border border-bark/20 rounded-xl px-4 py-3 bg-white text-bark text-sm
              focus:outline-none focus:ring-2 focus:ring-forest/25 cursor-pointer appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238B6343' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
          >
            <option value="" disabled>Select a topic…</option>
            {topics.map(t => (
              <option key={t.id} value={t.id}>
                {t.text.length > 60 ? t.text.slice(0, 60) + '…' : t.text}
              </option>
            ))}
          </select>

          {selectedTopic && (
            <div className="border-l-4 border-forest bg-white rounded-r-xl px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-forest uppercase mb-2.5">
                Exam Question
              </p>
              <p className="font-serif text-[15px] text-bark leading-[1.75]">
                {selectedTopic.text}
              </p>
            </div>
          )}
        </section>

        {/* ── Step 2: Essay ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <StepBadge n={2} active={!!selectedTopic} />
            <h2 className="text-xs font-semibold tracking-widest text-bark uppercase">Write Your Essay</h2>
          </div>

          <textarea
            value={essay}
            onChange={e => setEssay(e.target.value)}
            placeholder="Begin writing your response here…"
            rows={18}
            className="w-full border border-bark/20 rounded-xl px-5 py-4 bg-white text-bark text-[15px]
              leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-forest/25
              placeholder:text-bark/25"
          />

          {/* Word count progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${wordCountColor}`}>
                {wordCount} words — {wordCountLabel}
              </span>
              <span className="text-xs text-bark-light tabular-nums">
                {Math.min(Math.round((wordCount / 250) * 100), 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-bark/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${wordCount >= 250 ? 'bg-forest' : 'bg-gold'}`}
                style={{ width: `${Math.min((wordCount / 250) * 100, 100)}%` }}
              />
            </div>
          </div>
        </section>

        {/* ── Step 3: Submit ── */}
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <StepBadge n={3} active={canSubmit} />
            <h2 className={`text-xs font-semibold tracking-widest uppercase ${canSubmit ? 'text-bark' : 'text-bark-light'}`}>
              Get Your Score
            </h2>
          </div>

          <button
            onClick={handleGrade}
            disabled={!canSubmit}
            className="w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-200
              bg-forest text-white shadow-md shadow-forest/20
              hover:bg-forest-mid hover:shadow-lg hover:shadow-forest/25
              active:scale-[0.99]
              disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-forest"
          >
            {isGrading
              ? <span className="flex items-center justify-center gap-2"><IconSpinner /> Analysing your essay…</span>
              : 'Get Band Score'}
          </button>

          {/* AI badge */}
          <p className="flex items-center justify-center gap-1.5 text-xs text-bark-light">
            <IconStar />
            Powered by AI examiner · GPT-4o mini
          </p>
          <p className="text-xs text-bark-light/60 italic text-center leading-relaxed">
            Scores are estimates for practice only · Not affiliated with IELTS, British Council, or IDP · Actual exam scores may differ
          </p>

        </section>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
            {error}
          </p>
        )}

        {/* ── Results ── */}
        {result && (
          <section className="space-y-8 pt-2">

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-bark/10" />
              <span className="text-xs font-semibold tracking-widest text-bark-light uppercase">Your Results</span>
              <div className="flex-1 h-px bg-bark/10" />
            </div>

            {/* Overall band — large circle */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">Overall Band Score</p>
              <div className={`flex flex-col items-center justify-center w-44 h-44 rounded-full border-[6px] bg-white shadow-2xl shadow-bark/10 ${bandBorder(result.overall_band)}`}>
                <span className={`font-serif text-[3.75rem] font-bold leading-none ${bandText(result.overall_band)}`}>
                  {result.overall_band}
                </span>
                <span className="text-xs text-bark-light font-medium mt-1 tracking-wide">out of 9.0</span>
              </div>
              <span className={`text-sm font-semibold tracking-wide ${bandText(result.overall_band)}`}>
                {bandDescriptor(result.overall_band)}
              </span>
              <p className="text-xs text-bark-light italic text-center max-w-xs leading-relaxed">
                AI-estimated score for practice only · Not affiliated with IELTS or British Council · Actual exam scores may differ
              </p>
            </div>

            {/* Sub-scores with progress bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CRITERIA.map(({ key, label }) => {
                const score = result[key]
                return (
                  <div key={key} className="bg-white border border-bark/10 rounded-xl px-5 py-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-bark-light font-medium leading-snug">{label}</p>
                      <span className={`font-serif text-2xl font-bold flex-shrink-0 ${bandText(score)}`}>{score}</span>
                    </div>
                    <ScoreBar score={score} />
                    <div className="flex items-center justify-between mt-1.5">
                      <p className={`text-xs font-medium ${bandText(score)}`}>{bandDescriptor(score)}</p>
                      <p className="text-xs text-bark-light tabular-nums">{Math.round((score / 9) * 100)}%</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Improvements as icon cards */}
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">How to Improve</p>
              {result.improvements.map((tip, i) => {
                const { Icon, bg, color } = IMPROVEMENT_ICONS[i % IMPROVEMENT_ICONS.length]
                return (
                  <div key={i} className="flex gap-4 bg-white border border-bark/10 rounded-xl p-4 shadow-sm">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center`}>
                      <Icon />
                    </div>
                    <p className="text-sm text-bark leading-relaxed pt-0.5">{tip}</p>
                  </div>
                )
              })}
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl border-2 border-bark/15 text-bark-light text-sm font-semibold
                tracking-wide hover:bg-white hover:border-bark/25 hover:text-bark transition-all duration-200"
            >
              Try Another Topic
            </button>

          </section>
        )}
      </main>
    </div>
  )
}
