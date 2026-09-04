import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin123!')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('That email and password combination did not work.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-500">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 4L9 10L11 6L14 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display text-2xl font-semibold text-white">Meridian</span>
        </div>

        <div className="rounded-md bg-white p-8 shadow-panel">
          <h1 className="font-display text-lg font-semibold text-ink-900">Sign in</h1>
          <p className="mt-1 text-sm text-ink-400">Use your admin dashboard credentials.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-ink-100 px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-ink-100 px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {error && <p className="text-sm text-rose-500">{error}</p>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-xs text-ink-400">
            Seeded account: admin@example.com / Admin123!
          </p>
        </div>
      </div>
    </div>
  )
}
