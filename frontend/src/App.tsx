import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Landing from './pages/Landing'
import WritingPracticePage from './pages/WritingPracticePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import LevelTestPage from './pages/LevelTestPage'
import ReadingPracticePage from './pages/ReadingPracticePage'
import DemoPage from './pages/DemoPage'
import PricingPage from './pages/PricingPage'
import GrammarPracticePage from './pages/GrammarPracticePage'

function navigate(to: string) {
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function Router() {
  const [path, setPath] = useState(window.location.pathname)
  const { user, isLoading } = useAuth()

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  // Hold render while auth state is resolving
  if (isLoading) return <div className="min-h-screen bg-cream" />

  // Routing redirects — calling navigate() here is safe; returns null immediately after
  if (path === '/' && user)          { navigate('/dashboard'); return null }
  if (path === '/dashboard' && !user) { navigate('/login');    return null }

  if (path === '/login')      return <LoginPage />
  if (path === '/register')   return <RegisterPage />
  if (path === '/profile')    return <ProfilePage />
  if (path === '/dashboard')  return <DashboardPage />
  if (path === '/level-test') return <LevelTestPage />
  if (path === '/demo')       return <DemoPage />
  if (path === '/pricing')    return <PricingPage />
  if (path === '/grammar')    return <GrammarPracticePage />
  if (path === '/reading')    return <ReadingPracticePage />
  if (path === '/writing')    return <WritingPracticePage onBack={() => navigate('/')} />
  return <Landing onDemo={() => navigate('/demo')} />
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
