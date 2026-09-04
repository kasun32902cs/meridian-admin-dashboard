import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-canvas text-center">
      <p className="font-display text-5xl font-semibold text-ink-900">404</p>
      <p className="mt-2 text-sm text-ink-400">This page doesn't exist.</p>
      <Link to="/" className="mt-6 text-sm font-medium text-teal-500 hover:text-teal-600">
        Back to dashboard
      </Link>
    </div>
  )
}
