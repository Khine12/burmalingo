import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authApi } from '../api/client'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [token, setToken]       = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // On mount: verify any stored token is still valid
  useEffect(() => {
    const stored = localStorage.getItem('access_token')
    if (!stored) {
      setIsLoading(false)
      return
    }
    setToken(stored)
    authApi.me()
      .then(res => {
        setUser(res.data)
        setIsLoading(false)
      })
      .catch(() => {
        // Token invalid — 401 interceptor already cleared localStorage
        setToken(null)
        setIsLoading(false)
      })
  }, [])

  function login(newToken: string, newUser: User) {
    localStorage.setItem('access_token', newToken)
    setToken(newToken)
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem('access_token')
    setToken(null)
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
