import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@/types'
import * as authApi from '@/api/auth'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user')
    const storedToken = localStorage.getItem('auth_token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const response = await authApi.login(email, password)
    localStorage.setItem('auth_token', response.token)
    localStorage.setItem('auth_user', JSON.stringify(response.user))
    setUser(response.user)
  }

  const signOut = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
