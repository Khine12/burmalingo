import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { speakingApi, type SpeakingQuota, type SpeakingResult } from '../api/client'
import { speakingTopics, SPEAKING_LEVELS, type SpeakingTopic } from '../data/speaking_topics'
import { awardXP } from './DashboardPage'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const LEVEL_LABEL: Record<string, string> = {
  basic:               'Basic',
  elementary:          'Elementary',
  intermediate:        'Pre-Intermediate',
  'upper-intermediate':'Intermediate',
  advanced:            'Upper-Intermediate',
  ielts:               'IELTS',
}

const LEVEL_COLOR: Record<string, string> = {
  basic:               '#166534',
  elementary:          '#1a3a2a',
  intermediate:        '#b45309',
  'upper-intermediate':'#92400e',
  advanced:            '#c1440e',
  ielts:               '#6d28d9',
}

// ── Score bar ──────────────────────────────────────────────────────────────────
function ScoreBar({ label, value }: { label: string; value: number | null }) {
  if (value === null) return null
  const pct = Math.round(value)
  const color = pct >= 80 ? '#1B4332' : pct >= 60 ? '#b45309' : '#c1440e'
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-bark-light">{label}</span>
        <span className="font-semibold text-bark">{pct}</span>
      </div>
      <div className="h-2 bg-bark/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ── Practice panel (recording + results) ──────────────────────────────────────
function SpeakingPractice({
  topic,
  quota,
  onBack,
  onQuotaUpdate,
}: {
  topic: SpeakingTopic
  quota: SpeakingQuota | null
  onBack: () => void
  onQuotaUpdate: (updated: { used: number; limit: number; period_end: string | null }) => void
}) {
  type Phase = 'idle' | 'recording' | 'uploading' | 'results' | 'error'
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<SpeakingResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [secs, setSecs] = useState(0)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const MAX_SECS = 180

  function startTimer() {
    setSecs(0)
    timerRef.current = setInterval(() => setSecs(s => s + 1), 1000)
  }
  function clearTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }
  function stopWaveform() {
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null }
    if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null }
  }

  async function startRecording() {
    setErrorMsg('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        await submitAudio(blob)
      }
      recorderRef.current = recorder

      const audioCtx = new AudioContext()
      audioCtxRef.current = audioCtx
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 64
      audioCtx.createMediaStreamSource(stream).connect(analyser)
      const dataArr = new Uint8Array(analyser.frequencyBinCount)
      function drawFrame() {
        animFrameRef.current = requestAnimationFrame(drawFrame)
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx2d = canvas.getContext('2d')
        if (!ctx2d) return
        const w = canvas.offsetWidth
        if (canvas.width !== w) canvas.width = w
        analyser.getByteFrequencyData(dataArr)
        ctx2d.clearRect(0, 0, canvas.width, canvas.height)
        const n = dataArr.length
        const barW = canvas.width / n - 1
        for (let i = 0; i < n; i++) {
          const barH = Math.max(2, (dataArr[i] / 255) * canvas.height)
          ctx2d.fillStyle = '#1B4332'
          ctx2d.fillRect(i * (barW + 1), canvas.height - barH, barW, barH)
        }
      }
      drawFrame()

      recorder.start(100)
      setPhase('recording')
      startTimer()
    } catch {
      setErrorMsg('Could not access microphone. Please allow microphone permission and try again.')
      setPhase('error')
    }
  }

  function stopRecording() {
    clearTimer()
    stopWaveform()
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
    }
    setPhase('uploading')
  }

  async function submitAudio(blob: Blob) {
    console.log('[Speaking] blob size:', blob.size, 'type:', blob.type)
    try {
      const res = await speakingApi.assess(blob, topic.prompt)
      setResult(res.data)
      onQuotaUpdate(res.data.quota)
      awardXP()
      setPhase('results')
    } catch (err: unknown) {
      const e = err as { response?: { status?: number; data?: { detail?: unknown } } }
      const status = e?.response?.status
      const rawDetail = e?.response?.data?.detail
      // Stringify so we always surface the real server message (array for FastAPI
      // validation errors, string for HTTPException, object for quota errors).
      const detail = typeof rawDetail === 'string'
        ? rawDetail
        : rawDetail != null ? JSON.stringify(rawDetail) : undefined
      console.error('[Speaking] assess error', status, rawDetail)
      if (status === 429) {
        setErrorMsg('You have used all 25 assessments this period.')
      } else if (status === 402) {
        setErrorMsg('Your subscription has expired. Please renew to continue.')
      } else if (status === 403) {
        setErrorMsg('Speaking assessments require a Pro subscription.')
      } else if (status === 503) {
        setErrorMsg(detail ?? 'Server configuration error — contact support.')
      } else if (status === 422) {
        // Show the exact server reason so mismatches are immediately visible.
        setErrorMsg(detail ?? 'Could not process the audio. Please try again.')
      } else {
        setErrorMsg(detail ?? 'Something went wrong. Please try again.')
      }
      setPhase('error')
    }
  }

  function reset() {
    setPhase('idle')
    setResult(null)
    setErrorMsg('')
    setSecs(0)
  }

  useEffect(() => {
    if (phase === 'recording' && secs >= MAX_SECS) stopRecording()
  }, [secs, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { clearTimer(); stopWaveform() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isNotPro = quota && !quota.is_pro
  const isExpired = quota?.subscription_expired
  const isOverQuota = quota?.is_pro && !isExpired && (quota.used ?? 0) >= (quota.limit ?? 15)
  const blocked = isNotPro || isExpired || isOverQuota

  const overallScore = result?.overall_score ?? result?.pronunciation_score ?? null

  return (
    <div className="space-y-4">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-bark-light hover:text-bark transition-colors"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Back to topics
      </button>

      {/* Topic card */}
      <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: LEVEL_COLOR[topic.level] ?? '#1a3a2a' }}
          >
            {LEVEL_LABEL[topic.level] ?? topic.level}
          </span>
        </div>
        <p className="text-bark font-medium leading-relaxed">{topic.prompt}</p>
        {topic.hint && (
          <p className="text-sm text-bark-light italic leading-snug">{topic.hint}</p>
        )}
      </div>

      {/* Quota badge */}
      {quota?.is_pro && !isExpired && !isOverQuota && (
        <div className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs bg-forest/6 border border-forest/15">
          <span className="text-bark-light">
            {quota.used ?? 0} of {quota.limit} assessments used this period
          </span>
          {quota.period_end && (
            <span className="text-bark-light">resets {formatDate(quota.period_end)}</span>
          )}
        </div>
      )}

      {/* Gates */}
      {isNotPro && (
        <div className="bg-forest/8 border border-forest/20 rounded-xl p-5 text-center space-y-3">
          <p className="text-sm font-semibold text-bark">Pro feature</p>
          <p className="text-xs text-bark-light">Upgrade to get AI pronunciation scoring on your speaking.</p>
          <a href="/pricing" className="inline-block bg-forest text-white text-xs font-bold px-5 py-2 rounded-lg hover:bg-forest/90 transition-colors">
            Upgrade to Pro
          </a>
        </div>
      )}

      {isExpired && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center space-y-1">
          <p className="text-sm font-semibold text-red-700">Subscription expired</p>
          <p className="text-xs text-red-600">
            Expired {formatDate(quota!.period_end)}. Please contact us to renew.
          </p>
        </div>
      )}

      {isOverQuota && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center space-y-1">
          <p className="text-xl mb-1">🔒</p>
          <p className="text-sm font-semibold text-red-700">Monthly limit reached</p>
          <p className="text-xs text-red-600">
            You've used all {quota!.limit} scored assessments this period.
            {quota!.period_end ? ` Resets on ${formatDate(quota!.period_end)}.` : ''}
          </p>
        </div>
      )}

      {/* Recording panel — only shown when not blocked */}
      {!blocked && (
        <div className="bg-white rounded-2xl border border-bark/10 shadow-sm p-6 flex flex-col items-center gap-5">
          {phase === 'idle' && (
            <>
              <button
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-forest flex items-center justify-center shadow-md hover:bg-forest-mid transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Start recording"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z" />
                  <path d="M19 10a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V19H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 10z" />
                </svg>
              </button>
              <p className="text-sm text-bark-light">Tap to start recording</p>
            </>
          )}

          {phase === 'recording' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
                <button
                  onClick={stopRecording}
                  className="relative w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  aria-label="Stop recording"
                >
                  <div className="w-7 h-7 rounded-sm bg-white" />
                </button>
              </div>
              <canvas ref={canvasRef} height={48} className="w-full rounded-lg" />
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-bark tabular-nums">
                  {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}
                  <span className="text-sm font-normal text-bark-light ml-2">/ 3:00</span>
                </p>
                <p className="text-sm text-bark-light mt-1">Recording… tap to stop</p>
              </div>
            </>
          )}

          {phase === 'uploading' && (
            <>
              <div className="w-16 h-16 rounded-full border-4 border-forest/20 border-t-forest animate-spin" />
              <p className="text-sm text-bark-light">Scoring your pronunciation…</p>
            </>
          )}

          {phase === 'error' && (
            <div className="w-full text-center space-y-3">
              <p className="text-2xl">⚠️</p>
              <p className="text-sm text-red-600">{errorMsg}</p>
              <button
                onClick={reset}
                className="bg-forest text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-forest/90 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {phase === 'results' && result && (
            <div className="w-full space-y-5">
              {/* Overall score */}
              <div className="text-center">
                <p
                  className="text-6xl font-bold font-serif"
                  style={{
                    color:
                      (overallScore ?? 0) >= 80 ? '#1B4332'
                      : (overallScore ?? 0) >= 60 ? '#b45309'
                      : '#c1440e',
                  }}
                >
                  {overallScore !== null ? Math.round(overallScore) : '—'}
                </p>
                <p className="text-xs text-bark-light mt-1">Overall pronunciation score</p>
              </div>

              {/* Score breakdown */}
              <div className="space-y-3">
                <ScoreBar label="Accuracy"     value={result.accuracy_score} />
                <ScoreBar label="Fluency"      value={result.fluency_score} />
                <ScoreBar label="Completeness" value={result.completeness_score} />
                {result.prosody_score !== null && (
                  <ScoreBar label="Prosody" value={result.prosody_score} />
                )}
              </div>

              {/* Transcript */}
              {result.transcript && (
                <div className="bg-bark/4 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-bark-light mb-1.5">
                    What we heard
                  </p>
                  <p className="text-sm text-bark leading-relaxed">"{result.transcript}"</p>
                </div>
              )}

              {/* Updated quota after assessment */}
              {result.quota && (
                <div className="flex items-center justify-between text-xs text-bark-light bg-forest/6 border border-forest/15 rounded-xl px-4 py-2.5">
                  <span>{result.quota.used} of {result.quota.limit} used this period</span>
                  {result.quota.period_end && (
                    <span>resets {formatDate(result.quota.period_end)}</span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-forest text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-forest/90 transition-colors"
                >
                  Record again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 border border-bark/15 text-bark text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-bark/4 transition-colors"
                >
                  New topic
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Topic list ─────────────────────────────────────────────────────────────────
function TopicCard({ topic, onClick }: { topic: SpeakingTopic; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-bark/10 rounded-xl p-4 text-left hover:border-forest/30 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-bark leading-snug group-hover:text-forest transition-colors flex-1">
          {topic.prompt}
        </p>
        <span
          className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white mt-0.5"
          style={{ backgroundColor: LEVEL_COLOR[topic.level] ?? '#1a3a2a' }}
        >
          {LEVEL_LABEL[topic.level] ?? topic.level}
        </span>
      </div>
      {topic.hint && (
        <p className="text-xs text-bark-light mt-2 leading-snug">{topic.hint}</p>
      )}
    </button>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────────
export default function SpeakingPage() {
  const { user } = useAuth()
  const [selected, setSelected] = useState<SpeakingTopic | null>(null)
  const [quota, setQuota] = useState<SpeakingQuota | null>(null)
  const [activeLevel, setActiveLevel] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    if (user.tier === 'pro') {
      speakingApi.getQuota()
        .then(res => setQuota(res.data))
        .catch(() => {})
    } else {
      setQuota({ is_pro: false, limit: 25 })
    }
  }, [user])

  if (!user) { navigate('/login'); return null }

  const topicsByLevel = SPEAKING_LEVELS
    .map(lvl => ({ ...lvl, topics: speakingTopics.filter(t => t.level === lvl.id) }))
    .filter(lvl => lvl.topics.length > 0)

  const header = (showBack: boolean) => (
    <header className="bg-forest border-b border-forest-mid sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
        {showBack && (
          <button
            onClick={() => navigate('/dashboard')}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Back to dashboard"
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

  // ── Practice view ──────────────────────────────────────────────────────────
  if (selected) {
    return (
      <div className="min-h-screen bg-cream font-sans">
        {header(false)}
        <main className="max-w-2xl mx-auto px-6 py-8">
          <SpeakingPractice
            topic={selected}
            quota={quota}
            onBack={() => setSelected(null)}
            onQuotaUpdate={updated => {
              if (quota?.is_pro) {
                setQuota({ ...quota, used: updated.used, period_end: updated.period_end })
              }
            }}
          />
        </main>
      </div>
    )
  }

  // ── Topic list view ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream font-sans">
      {header(true)}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-bark">Speaking Practice</h1>
          <p className="text-bark-light text-sm mt-1">
            Choose a topic, record your response, and get instant pronunciation feedback.
          </p>
        </div>

        {/* Quota summary */}
        {quota?.is_pro && !quota.subscription_expired && (
          <div className="flex items-center gap-2 bg-white border border-bark/10 rounded-xl px-4 py-2.5 text-xs text-bark-light">
            <span>🎙</span>
            <span>{quota.used ?? 0} of {quota.limit} assessments used this period</span>
            {quota.period_end && (
              <span className="ml-auto">resets {formatDate(quota.period_end)}</span>
            )}
          </div>
        )}

        {/* Pro upgrade prompt */}
        {quota && !quota.is_pro && (
          <div className="flex items-center justify-between bg-forest/8 border border-forest/20 rounded-xl px-5 py-4 gap-4">
            <div>
              <p className="text-sm font-semibold text-bark">Pro feature</p>
              <p className="text-xs text-bark-light mt-0.5">
                Upgrade to unlock AI pronunciation scoring — 25 assessments per month.
              </p>
            </div>
            <a
              href="/pricing"
              className="shrink-0 bg-forest text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-forest/90 transition-colors"
            >
              Upgrade
            </a>
          </div>
        )}

        {/* Subscription expired */}
        {quota?.subscription_expired && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-red-700">Subscription expired</p>
            <p className="text-xs text-red-600 mt-0.5">
              Your Pro access expired {formatDate(quota.period_end)}. Contact us to renew.
            </p>
          </div>
        )}

        {/* Level filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-6 px-6">
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
          {SPEAKING_LEVELS.map(lvl => (
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

        {(activeLevel ? topicsByLevel.filter(lvl => lvl.id === activeLevel) : topicsByLevel).map(lvl => (
          <section key={lvl.id}>
            <h2 className="font-serif text-base font-bold text-bark mb-3">{lvl.label}</h2>
            <div className="space-y-2">
              {lvl.topics.map(topic => (
                <TopicCard key={topic.id} topic={topic} onClick={() => setSelected(topic)} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
