import { useState } from 'react'
import Landing from './pages/Landing'

export default function App() {
  const [view, setView] = useState<'landing' | 'demo'>('landing')
  if (view === 'landing') return <Landing onDemo={() => setView('demo')} />
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
      <h1 className="font-serif text-3xl font-bold text-bark">Demo coming soon</h1>
      <button onClick={() => setView('landing')} className="text-forest-mid underline text-sm"> Back</button>
    </div>
  )
}
