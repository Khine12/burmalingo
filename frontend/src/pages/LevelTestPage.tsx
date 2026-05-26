import { useState, useMemo } from 'react'
import { QUESTIONS, LEVEL_NAMES } from '../data/levelTestQuestions'
import { useAuth } from '../context/AuthContext'
import { canTakeLevelTest, recordLevelTestDone, LIMIT_MESSAGES } from '../utils/limits'

type Phase = 'intro' | 'quiz' | 'result'

interface LevelScore { correct: number; total: number }

function computeResult(answers: (number | null)[], questions: typeof QUESTIONS) {
  const scores: Record<number, LevelScore> = {}

  questions.forEach((q, i) => {
    if (!scores[q.level]) scores[q.level] = { correct: 0, total: 0 }
    scores[q.level].total++
    if (answers[i] === q.correct) scores[q.level].correct++
  })

  // Highest consecutive level where score >= 3 / 5
  let recommended = 1
  for (let lvl = 1; lvl <= 6; lvl++) {
    const s = scores[lvl]
    if (s && s.correct >= 3) recommended = lvl
    else break
  }

  return { scores, recommended }
}

export default function LevelTestPage() {
  const [phase, setPhase]     = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const shuffledQuestions = useMemo(() => [...QUESTIONS].sort(() => Math.random() - 0.5), [])
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(shuffledQuestions.length).fill(null))
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult]   = useState<{ scores: Record<number, LevelScore>; recommended: number } | null>(null)
  const { user } = useAuth()
  const isPro = user?.tier === 'pro'

  const q        = shuffledQuestions[currentQ]
  const progress = ((currentQ + (selected !== null ? 1 : 0)) / shuffledQuestions.length) * 100
  const isCorrect = selected !== null && selected === q.correct
  const isLast    = currentQ === shuffledQuestions.length - 1

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
  }

  function handleNext() {
    const newAnswers = [...answers]
    newAnswers[currentQ] = selected
    setAnswers(newAnswers)

    if (isLast) {
      const r = computeResult(newAnswers, shuffledQuestions)
      setResult(r)
      localStorage.setItem('burmalingo_level_result', JSON.stringify({
        level: r.recommended,
        date: new Date().toISOString(),
      }))
      setPhase('result')
      recordLevelTestDone()
    } else {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
    }
  }

  function handleRetake() {
    setPhase('intro')
    setCurrentQ(0)
    setAnswers(new Array(shuffledQuestions.length).fill(null))
    setSelected(null)
    setResult(null)
  }

  if (!canTakeLevelTest(isPro)) return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-bark/10 p-10 max-w-md w-full text-center space-y-4">
        <p className="text-4xl">🔒</p>
        <h1 className="font-serif text-xl font-bold text-bark">Level Test Locked</h1>
        <p className="text-bark-light text-sm leading-relaxed">{LIMIT_MESSAGES.levelTest}</p>
        <a href="/pricing" className="block w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors">
          Upgrade to Pro →
        </a>
        <a href="/dashboard" className="block text-sm text-bark-light hover:text-bark transition-colors mt-2">
          Back to Dashboard
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Header ── */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Dashboard
          </a>
          <span className="font-serif font-bold text-bark">Level Placement Test</span>
          <div className="w-20" />
        </div>
      </header>

      {/* ── Intro ── */}
      {phase === 'intro' && (
        <div className="max-w-lg mx-auto px-6 py-16 text-center space-y-7">
          <div className="text-6xl">📊</div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-bark">Level Placement Test</h1>
            <p className="text-bark-light text-sm mt-3 leading-relaxed max-w-sm mx-auto">
              35 questions across 6 levels — from Basic to IELTS Preparation. We use your results to recommend your ideal starting level. Retake anytime.
            </p>
          </div>
          <div className="flex justify-center gap-6 text-sm text-bark-light">
            <span>📝 35 questions</span>
            <span>⏱ ~15 minutes</span>
            <span>🔁 Retake anytime</span>
          </div>
          <button
            onClick={() => setPhase('quiz')}
            className="bg-forest text-white font-bold px-10 py-4 rounded-xl text-sm tracking-wide hover:bg-forest-mid transition-colors shadow-md shadow-forest/20"
          >
            Start Test
          </button>
          <a href="/dashboard" className="block text-xs text-bark-light hover:text-bark transition-colors">
            Skip for now
          </a>
        </div>
      )}

      {/* ── Quiz ── */}
      {phase === 'quiz' && (
        <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-bark-light">
              <span>Question {currentQ + 1} of {shuffledQuestions.length}</span>
              <span className="text-bark-light/60">Level {q.level} · {LEVEL_NAMES[q.level]}</span>
            </div>
            <div className="h-1.5 bg-bark/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-bark/10 shadow-sm px-6 py-6 space-y-5">
            {/* Type badge */}
            <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-bark-light/70 bg-bark/5 px-2.5 py-1 rounded-full">
              {q.type}
            </span>

            <p className="font-serif text-[15px] text-bark leading-[1.75] font-medium">
              {q.question}
            </p>

            <div className="space-y-2.5">
              {q.options.map((opt, i) => {
                let cls = 'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 '
                if (selected === null) {
                  cls += 'border-bark/20 bg-white text-bark hover:border-forest/40 hover:bg-forest-pale cursor-pointer'
                } else if (i === q.correct) {
                  cls += 'border-forest bg-forest-pale text-forest font-semibold'
                } else if (i === selected) {
                  cls += 'border-red-300 bg-red-50 text-red-700'
                } else {
                  cls += 'border-bark/8 bg-white text-bark-light opacity-50 cursor-default'
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                  >
                    <span className="font-semibold text-bark-light/70 mr-2 text-xs">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {selected !== null && (
              <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                isCorrect ? 'bg-forest-pale text-forest' : 'bg-red-50 text-red-700'
              }`}>
                <span className="font-bold">{isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}</span>
                {q.explanation}
              </div>
            )}
          </div>

          {/* Next button — appears after selection */}
          {selected !== null && (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl tracking-wide hover:bg-forest-mid transition-colors"
            >
              {isLast ? 'See My Results →' : 'Next Question →'}
            </button>
          )}
        </div>
      )}

      {/* ── Results ── */}
      {phase === 'result' && result && (
        <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">

          {/* Recommended level hero */}
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">Your Results</p>
            <h2 className="font-serif text-3xl font-bold text-bark">Recommended Starting Level</h2>
            <div className="inline-flex flex-col items-center bg-forest text-white rounded-2xl px-12 py-7 shadow-xl shadow-forest/20">
              <span className="font-serif text-6xl font-bold leading-none">{result.recommended}</span>
              <span className="text-white/75 text-sm mt-2 tracking-wide">{LEVEL_NAMES[result.recommended]}</span>
            </div>
            <p className="text-bark-light text-sm max-w-xs mx-auto leading-relaxed">
              Based on your answers, this is your ideal starting point. You can always advance as you improve.
            </p>
          </div>

          {/* Score breakdown by level */}
          <div className="bg-white rounded-2xl border border-bark/10 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-bark/8">
              <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">Score by Level</p>
            </div>
            {(Object.entries(result.scores) as [string, LevelScore][]).map(([lvl, s]) => {
              const pct    = (s.correct / s.total) * 100
              const passed = s.correct >= 3
              return (
                <div key={lvl} className="px-5 py-4 border-b border-bark/6 last:border-0 flex items-center gap-4">
                  <div className="w-40 flex-shrink-0">
                    <p className="text-sm font-medium text-bark">{LEVEL_NAMES[Number(lvl)]}</p>
                    <p className="text-xs text-bark-light">Level {lvl}</p>
                  </div>
                  <div className="flex-1 h-2 bg-bark/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${passed ? 'bg-forest' : 'bg-red-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 w-10 text-right ${passed ? 'text-forest' : 'text-red-600'}`}>
                    {s.correct}/{s.total}
                  </span>
                  <span className="flex-shrink-0 text-sm">
                    {passed ? '✓' : '✗'}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href="/dashboard"
              className="block w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl tracking-wide text-center hover:bg-forest-mid transition-colors shadow-sm shadow-forest/20"
            >
              Go to Dashboard
            </a>
            <button
              onClick={handleRetake}
              className="w-full py-3.5 border-2 border-bark/15 text-bark-light text-sm font-semibold rounded-xl hover:bg-white hover:border-bark/25 hover:text-bark transition-all"
            >
              Retake Test
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
