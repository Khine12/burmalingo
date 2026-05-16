import { useState } from 'react'
import { grammarLessons, type GrammarLesson, type GrammarQuestion, type GrammarLevel } from '../data/grammarLessons'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

type Phase = 'list' | 'quiz' | 'results'

function levelStyle(level: GrammarLevel) {
  if (level === 'basic') return 'bg-forest-pale text-forest'
  if (level === 'elementary') return 'bg-gold-pale text-gold'
  return 'bg-red-50 text-red-600'
}

function isCorrect(q: GrammarQuestion, ans: string | number | undefined): boolean {
  if (ans === undefined) return false
  if (q.type === 'multiple') return ans === q.answer
  if (q.type === 'fillin') {
    if (typeof ans !== 'string') return false
    return ans.trim().toLowerCase() === (q.answer as string).toLowerCase()
  }
  return false
}

export default function GrammarPracticePage() {
  const [phase, setPhase] = useState<Phase>('list')
  const [lesson, setLesson] = useState<GrammarLesson | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [filterLevel, setFilterLevel] = useState<GrammarLevel | 'all'>('all')

  const filtered = filterLevel === 'all'
    ? grammarLessons
    : grammarLessons.filter(l => l.level === filterLevel)

  function startLesson(l: GrammarLesson) {
    setLesson(l)
    setCurrent(0)
    setAnswers({})
    setShowFeedback(false)
    setPhase('quiz')
  }

  function handleAnswer(val: string | number) {
    if (!lesson || showFeedback) return
    setAnswers(prev => ({ ...prev, [lesson.questions[current].id]: val }))
    setShowFeedback(true)
  }

  function handleNext() {
    if (!lesson) return
    if (current + 1 < lesson.questions.length) {
      setCurrent(c => c + 1)
      setShowFeedback(false)
    } else {
      setPhase('results')
    }
  }

  const score = lesson
    ? lesson.questions.filter(q => isCorrect(q, answers[q.id])).length
    : 0

  return (
    <div className="min-h-screen bg-cream font-sans">
      {/* Header */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => phase === 'list' ? navigate('/dashboard') : setPhase('list')}
            className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {phase === 'list' ? 'Dashboard' : 'All Lessons'}
          </button>
          <span className="font-serif font-bold text-bark">Grammar Practice</span>
          {phase === 'quiz' && lesson ? (
            <span className="text-xs font-semibold text-bark-light tabular-nums">
              {current + 1}/{lesson.questions.length}
            </span>
          ) : <div className="w-24" />}
        </div>
      </header>

      {/* List */}
      {phase === 'list' && (
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-bark">Grammar Practice</h1>
            <p className="text-bark-light text-sm mt-1">One question at a time · Instant feedback · Simple English</p>
          </div>

          {/* Level filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'basic', 'elementary', 'pre-intermediate'] as const).map(l => (
              <button
                key={l}
                onClick={() => setFilterLevel(l)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all capitalize ${
                  filterLevel === l
                    ? 'bg-forest text-white border-forest'
                    : 'bg-white text-bark-light border-bark/20 hover:border-forest/40'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(l => (
              <button
                key={l.id}
                onClick={() => startLesson(l)}
                className="text-left bg-white border border-bark/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-bark-light uppercase tracking-wider">{l.topic}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${levelStyle(l.level)}`}>
                    {l.level}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-bark group-hover:text-forest transition-colors leading-snug mb-2">
                  {l.title}
                </h3>
                <p className="text-xs text-bark-light">{l.questions.length} questions</p>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Quiz */}
      {phase === 'quiz' && lesson && (
        <main className="max-w-xl mx-auto px-6 py-10">
          {/* Progress bar */}
          <div className="w-full bg-bark/10 rounded-full h-1.5 mb-8">
            <div
              className="bg-forest h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / lesson.questions.length) * 100}%` }}
            />
          </div>

          <QuizCard
            q={lesson.questions[current]}
            index={current}
            selected={answers[lesson.questions[current].id]}
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLast={current + 1 === lesson.questions.length}
            isCorrect={isCorrect(lesson.questions[current], answers[lesson.questions[current].id])}
          />
        </main>
      )}

      {/* Results */}
      {phase === 'results' && lesson && (
        <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">Your Score</p>
            <div className={`inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-[5px] bg-white shadow-xl shadow-bark/10 ${
              score === lesson.questions.length ? 'border-forest'
              : score >= Math.ceil(lesson.questions.length * 0.7) ? 'border-gold'
              : 'border-red-400'
            }`}>
              <span className={`font-serif text-4xl font-bold ${
                score === lesson.questions.length ? 'text-forest'
                : score >= Math.ceil(lesson.questions.length * 0.7) ? 'text-gold'
                : 'text-red-600'
              }`}>
                {score}/{lesson.questions.length}
              </span>
            </div>
            <p className="text-bark-light text-sm">
              {score === lesson.questions.length ? 'Perfect! Excellent work! 🎉'
                : score >= Math.ceil(lesson.questions.length * 0.7) ? 'Good job! Keep practising.'
                : 'Keep going — you\'ll get it!'}
            </p>
          </div>

          {/* Review */}
          <div className="space-y-4">
            {lesson.questions.map((q, i) => {
              const correct = isCorrect(q, answers[q.id])
              const ans = answers[q.id]
              const userLabel = q.type === 'multiple'
                ? (typeof ans === 'number' ? q.options![ans] : 'No answer')
                : (typeof ans === 'string' ? ans || 'No answer' : 'No answer')
              const correctLabel = q.type === 'multiple'
                ? q.options![q.answer as number]
                : q.answer as string

              return (
                <div key={q.id} className={`rounded-2xl border px-5 py-4 space-y-2 ${correct ? 'bg-forest-pale border-forest/20' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`font-bold text-sm mt-0.5 flex-shrink-0 ${correct ? 'text-forest' : 'text-red-600'}`}>
                      {correct ? '✓' : '✗'}
                    </span>
                    <p className="text-sm font-medium text-bark">Q{i + 1}: {q.question}</p>
                  </div>
                  <div className="ml-6 space-y-1 text-xs">
                    {!correct && <p className="text-red-700"><span className="font-semibold">Your answer: </span>{userLabel}</p>}
                    <p className={correct ? 'text-forest' : 'text-bark-mid'}>
                      <span className="font-semibold">Correct: </span>{correctLabel}
                    </p>
                    <p className="text-bark-light leading-relaxed pt-1">{q.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => startLesson(lesson)}
              className="w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl tracking-wide hover:bg-forest-mid transition-colors shadow-sm"
            >
              Retry This Lesson
            </button>
            <button
              onClick={() => setPhase('list')}
              className="w-full py-3.5 border-2 border-bark/15 text-bark-light text-sm font-semibold rounded-xl hover:bg-white hover:border-bark/25 hover:text-bark transition-all"
            >
              Try Another Lesson
            </button>
          </div>
        </main>
      )}
    </div>
  )
}

function QuizCard({
  q, index, selected, showFeedback, onAnswer, onNext, isLast, isCorrect,
}: {
  q: GrammarQuestion
  index: number
  selected: string | number | undefined
  showFeedback: boolean
  onAnswer: (val: string | number) => void
  onNext: () => void
  isLast: boolean
  isCorrect: boolean
}) {
  const [fillVal, setFillVal] = useState('')

  return (
    <div className="bg-white rounded-2xl border border-bark/10 shadow-sm px-6 py-6 space-y-5">
      <div>
        <span className="text-[10px] font-semibold tracking-widest text-bark-light/60 uppercase block mb-2">
          Question {index + 1} · {q.type === 'multiple' ? 'Multiple Choice' : 'Fill in the Blank'}
        </span>
        <p className="text-lg font-medium text-bark leading-relaxed">{q.question}</p>
      </div>

      {/* Multiple choice */}
      {q.type === 'multiple' && q.options && (
        <div className="space-y-2">
          {q.options.map((opt, j) => {
            let style = 'bg-white border-bark/20 text-bark hover:border-forest/30 hover:bg-forest-pale/50'
            if (showFeedback) {
              if (j === q.answer) style = 'bg-forest-pale border-forest text-forest font-semibold'
              else if (selected === j) style = 'bg-red-50 border-red-400 text-red-700'
              else style = 'bg-white border-bark/10 text-bark/40'
            } else if (selected === j) {
              style = 'bg-forest-pale border-forest text-forest font-semibold'
            }
            return (
              <button
                key={j}
                onClick={() => onAnswer(j)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${style}`}
              >
                <span className="font-semibold text-bark-light/60 mr-2 text-xs">{String.fromCharCode(65 + j)}.</span>
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {/* Fill in blank */}
      {q.type === 'fillin' && (
        <div className="space-y-3">
          <input
            type="text"
            value={fillVal}
            onChange={e => setFillVal(e.target.value)}
            disabled={showFeedback}
            placeholder="Type your answer…"
            className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30 disabled:bg-bark/5"
          />
          {!showFeedback && (
            <button
              onClick={() => onAnswer(fillVal)}
              disabled={!fillVal.trim()}
              className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors disabled:opacity-30"
            >
              Check Answer
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className={`rounded-xl px-4 py-3 text-sm space-y-1 ${isCorrect ? 'bg-forest-pale border border-forest/20' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-bold ${isCorrect ? 'text-forest' : 'text-red-700'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
          </p>
          <p className="text-bark-light leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {showFeedback && (
        <button
          onClick={onNext}
          className="w-full py-3 bg-forest text-white font-bold text-sm rounded-xl hover:bg-forest-mid transition-colors"
        >
          {isLast ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
