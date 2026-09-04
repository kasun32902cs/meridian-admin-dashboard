import { useAuth } from '@/context/AuthContext'

export default function Topbar({ title }: { title: string }) {
  const { user, signOut } = useAuth()

  const initials = user?.fullName
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-ink-100 bg-white px-8">
      <h1 className="font-display text-xl font-semibold text-ink-900">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-ink-900">{user?.fullName}</p>
          <p className="text-xs text-ink-400">{user?.role}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-600">
          {initials}
        </div>
        <button
          onClick={signOut}
          className="rounded-md border border-ink-100 px-3 py-1.5 text-sm text-ink-400 transition-colors hover:border-ink-400/40 hover:text-ink-900"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
