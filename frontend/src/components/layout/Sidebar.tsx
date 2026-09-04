import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Overview', icon: OverviewIcon, end: true },
  { to: '/projects', label: 'Projects', icon: ProjectsIcon },
  { to: '/users', label: 'Team', icon: TeamIcon },
]

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col bg-ink-900 text-ink-50">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 12L6 4L9 10L11 6L14 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-display text-lg font-semibold tracking-tight text-white">Meridian</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'border-teal-400 bg-white/5 text-white font-medium'
                  : 'border-transparent text-ink-100/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-4 text-xs text-ink-100/50">
        Meridian Admin · v0.1
      </div>
    </aside>
  )
}

function OverviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8.5" y="1.5" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8.5" y="7.5" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1.5" y="9.5" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 4.5C1.5 3.67 2.17 3 3 3H6L7.5 4.5H13C13.83 4.5 14.5 5.17 14.5 6V11.5C14.5 12.33 13.83 13 13 13H3C2.17 13 1.5 12.33 1.5 11.5V4.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 14C1.5 11.24 3.24 9.5 5.5 9.5C7.76 9.5 9.5 11.24 9.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 9.7C12 9.9 13.5 11.4 13.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
