import { useState } from 'react'
import {
  readingPassages,
  type ReadingPassage,
  type PassageQuestion,
  type Difficulty,
} from '../data/ieltReadingPassages'

type Phase = 'list' | 'reading' | 'results'

// ── Helpers ────────────────────────────────────────────────────────────
function difficultyStyle(d: Difficulty) {
  if (d === 'easy') return 'bg-forest-pale text-forest'
  if (d === 'hard') return 'bg-red-50 text-red-600'
  return 'bg-gold-pale text-gold'
}

function isAnswerCorrect(q: PassageQuestion, ans: string | number | undefined): boolean {
  if (ans === undefined) return false
  if (q.type === 'tfng') return typeof ans === 'string' && ans === q.answer
  if (q.type === 'multiple' || q.type === 'matching') return typeof ans === 'number' && ans === q.answer
  if (q.type === 'fillin') {
    if (typeof ans !== 'string' || ans.trim() === '') return false
    const norm = ans.trim().toLowerCase()
    return norm === q.answer.toLowerCase() || q.alternatives.some(a => norm === a.toLowerCase())
  }
  return false
}

function correctLabel(q: PassageQuestion): string {
  if (q.type === 'tfng') return q.answer
  if (q.type === 'multiple' || q.type === 'matching') return q.options[q.answer]
  if (q.type === 'fillin') return q.answer
  return ''
}

function questionTypeLabel(type: PassageQuestion['type']) {
  if (type === 'tfng')     return 'True / False / Not Given'
  if (type === 'multiple') return 'Multiple Choice'
  if (type === 'fillin')   return 'Fill in the Blank'
  return 'Paragraph Matching'
}

// ── Page ───────────────────────────────────────────────────────────────
export default function ReadingPracticePage() {
  const [phase, setPhase]     = useState<Phase>('list')
  const [passage, setPassage] = useState<ReadingPassage | null>(null)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [score, setScore]     = useState(0)

  function startPassage(p: ReadingPassage) {
    setPassage(p)
    setAnswers({})
    setScore(0)
    setPhase('reading')
  }

  function setAnswer(qId: number, value: string | number) {
    setAnswers(prev => ({ ...prev, [qId]: value }))
  }

  function handleSubmit() {
    if (!passage) return
    const correct = passage.questions.filter(q => isAnswerCorrect(q, answers[q.id])).length
    setScore(correct)
    setPhase('results')
  }

  const allAnswered = passage
    ? passage.questions.every(q => {
        const ans = answers[q.id]
        if (q.type === 'fillin') return typeof ans === 'string' && ans.trim() !== ''
        return ans !== undefined
      })
    : false

  const answeredCount = passage
    ? passage.questions.filter(q => {
        const ans = answers[q.id]
        if (q.type === 'fillin') return typeof ans === 'string' && ans.trim() !== ''
        return ans !== undefined
      }).length
    : 0

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── Header ── */}
      <header className="border-b border-bark/10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {phase === 'list' ? (
            <a href="/dashboard" className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Dashboard
            </a>
          ) : (
            <button onClick={() => setPhase('list')} className="flex items-center gap-1.5 text-bark-light hover:text-bark text-sm transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All Passages
            </button>
          )}
          <span className="font-serif font-bold text-bark">IELTS Reading Practice</span>
          {phase === 'reading' && passage ? (
            <span className="text-xs font-semibold text-bark-light tabular-nums">
              {answeredCount}/{passage.questions.length} answered
            </span>
          ) : (
            <div className="w-24" />
          )}
        </div>
      </header>

      {/* ── Passage list ── */}
      {phase === 'list' && (
        <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-bark">Reading Practice</h1>
            <p className="text-bark-light text-sm mt-1">
              IELTS Academic-style passages · T/F/NG, multiple choice, fill-in, and paragraph matching
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readingPassages.map(p => (
              <button
                key={p.id}
                onClick={() => startPassage(p)}
                className="text-left bg-white border border-bark/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-bark-light uppercase tracking-wider">{p.topic}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyle(p.difficulty)}`}>
                    {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-bark group-hover:text-forest transition-colors leading-snug mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-bark-light">{p.questions.length} questions</p>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* ── Reading + questions ── */}
      {phase === 'reading' && passage && (
        <main className="max-w-5xl mx-auto px-6 py-8 space-y-8 lg:grid lg:grid-cols-[1fr_420px] lg:gap-8 lg:space-y-0 lg:items-start">

          {/* Passage text — sticky on large screens */}
          <div className="lg:sticky lg:top-[73px]">
            <div className="bg-white rounded-2xl border border-bark/10 shadow-sm overflow-hidden">
              <div className="border-b border-bark/8 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg font-bold text-bark">{passage.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-bark-light">{passage.topic}</span>
                    <span className="text-bark/20">·</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyStyle(passage.difficulty)}`}>
                      {passage.difficulty.charAt(0).toUpperCase() + passage.difficulty.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-5 text-[14px] text-bark leading-[1.9] space-y-4 max-h-[60vh] overflow-y-auto">
                {passage.passage.split('\n\n').map((para, i) => (
                  <p key={i} className={para.match(/^[A-F]\./) ? 'font-medium' : ''}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Questions panel */}
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-bark">Questions</h3>
            {passage.questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                selected={answers[q.id]}
                onAnswer={val => setAnswer(q.id, val)}
              />
            ))}

            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full py-4 bg-forest text-white font-bold text-sm rounded-xl tracking-wide hover:bg-forest-mid transition-colors shadow-sm shadow-forest/20
                disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {allAnswered ? 'Submit Answers →' : `Answer all ${passage.questions.length} questions to submit`}
            </button>
          </div>
        </main>
      )}

      {/* ── Results ── */}
      {phase === 'results' && passage && (
        <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs font-semibold tracking-widest text-bark-light uppercase">Your Score</p>
            <div className={`inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-[5px] bg-white shadow-xl shadow-bark/10 ${
              score >= Math.ceil(passage.questions.length * 0.8) ? 'border-forest'
              : score >= Math.ceil(passage.questions.length * 0.6) ? 'border-gold'
              : 'border-red-400'
            }`}>
              <span className={`font-serif text-4xl font-bold ${
                score >= Math.ceil(passage.questions.length * 0.8) ? 'text-forest'
                : score >= Math.ceil(passage.questions.length * 0.6) ? 'text-gold'
                : 'text-red-600'
              }`}>
                {score}/{passage.questions.length}
              </span>
            </div>
            <p className="text-bark-light text-sm">
              {score === passage.questions.length ? 'Perfect score!'
                : score >= Math.ceil(passage.questions.length * 0.8) ? 'Excellent work!'
                : score >= Math.ceil(passage.questions.length * 0.6) ? 'Good effort.'
                : 'Keep practising.'}
            </p>
          </div>

          <div className="space-y-4">
            {passage.questions.map((q, i) => {
              const correct = isAnswerCorrect(q, answers[q.id])
              const ans = answers[q.id]
              let userLabel = 'No answer'
              if (q.type === 'tfng' && typeof ans === 'string') userLabel = ans
              else if ((q.type === 'multiple' || q.type === 'matching') && typeof ans === 'number') userLabel = q.options[ans]
              else if (q.type === 'fillin' && typeof ans === 'string') userLabel = ans || 'No answer'

              return (
                <div key={q.id} className={`rounded-2xl border px-5 py-4 space-y-3 ${correct ? 'bg-forest-pale border-forest/20' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 font-bold text-sm mt-0.5 ${correct ? 'text-forest' : 'text-red-600'}`}>
                      {correct ? '✓' : '✗'}
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-bark-light/60 block mb-1">
                        Q{i + 1} · {questionTypeLabel(q.type)}
                      </span>
                      <p className="text-sm font-medium text-bark leading-relaxed">{q.question}</p>
                    </div>
                  </div>
                  <div className="ml-6 space-y-1 text-xs">
                    {!correct && (
                      <p className="text-red-700"><span className="font-semibold">Your answer: </span>{userLabel}</p>
                    )}
                    <p className={correct ? 'text-forest' : 'text-bark-mid'}>
                      <span className="font-semibold">Correct: </span>{correctLabel(q)}
                    </p>
                    <p className="text-bark-light leading-relaxed pt-1">{q.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => startPassage(passage)}
              className="w-full py-3.5 bg-forest text-white font-bold text-sm rounded-xl tracking-wide hover:bg-forest-mid transition-colors shadow-sm"
            >
              Retry This Passage
            </button>
            <button
              onClick={() => setPhase('list')}
              className="w-full py-3.5 border-2 border-bark/15 text-bark-light text-sm font-semibold rounded-xl hover:bg-white hover:border-bark/25 hover:text-bark transition-all"
            >
              Try Another Passage
            </button>
          </div>
        </main>
      )}
    </div>
  )
}

// ── Question card component ────────────────────────────────────────────
function QuestionCard({
  q, index, selected, onAnswer,
}: {
  q: PassageQuestion
  index: number
  selected: string | number | undefined
  onAnswer: (val: string | number) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-bark/10 shadow-sm px-5 py-5 space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bark/8 text-bark-light text-xs font-bold flex items-center justify-center mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 space-y-0.5">
          <span className="text-[10px] font-semibold tracking-widest text-bark-light/60 uppercase block">
            {questionTypeLabel(q.type)}
          </span>
          <p className="text-sm text-bark font-medium leading-relaxed">{q.question}</p>
        </div>
      </div>

      <div className="ml-9">
        {/* TRUE / FALSE / NOT GIVEN */}
        {q.type === 'tfng' && (
          <div className="flex flex-wrap gap-2">
            {(['TRUE', 'FALSE', 'NOT GIVEN'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => onAnswer(opt)}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                  selected === opt
                    ? 'bg-forest text-white border-forest'
                    : 'bg-white text-bark border-bark/20 hover:border-forest/40 hover:bg-forest-pale'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Multiple choice or paragraph matching — same rendering */}
        {(q.type === 'multiple' || q.type === 'matching') && (
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <button
                key={j}
                onClick={() => onAnswer(j)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                  selected === j
                    ? 'bg-forest-pale border-forest text-forest font-semibold'
                    : 'bg-white border-bark/20 text-bark hover:border-forest/30 hover:bg-forest-pale/50'
                }`}
              >
                <span className="font-semibold text-bark-light/60 mr-2 text-xs">{String.fromCharCode(65 + j)}.</span>
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Fill in the blank */}
        {q.type === 'fillin' && (
          <input
            type="text"
            value={typeof selected === 'string' ? selected : ''}
            onChange={e => onAnswer(e.target.value)}
            placeholder="Type your answer here…"
            className="w-full border border-bark/20 rounded-xl px-4 py-3 text-bark text-sm
              focus:outline-none focus:ring-2 focus:ring-forest/25 placeholder:text-bark/30"
          />
        )}
      </div>
    </div>
  )
}
