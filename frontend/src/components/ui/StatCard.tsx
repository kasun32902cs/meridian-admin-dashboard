interface StatCardProps {
  label: string
  value: string | number
  accent?: 'teal' | 'ochre' | 'rose' | 'ink'
  hint?: string
  emphasize?: boolean
}

const accentClasses: Record<string, string> = {
  teal: 'border-l-teal-500',
  ochre: 'border-l-ochre-500',
  rose: 'border-l-rose-500',
  ink: 'border-l-ink-400',
}

export default function StatCard({ label, value, accent = 'teal', hint, emphasize }: StatCardProps) {
  return (
    <div
      className={`rounded-md border-l-[3px] bg-white p-5 shadow-panel ${accentClasses[accent]} ${
        emphasize ? 'sm:col-span-2' : ''
      }`}
    >
      <p className="text-sm text-ink-400">{label}</p>
      <p className={`mt-2 font-display font-semibold text-ink-900 ${emphasize ? 'text-4xl' : 'text-3xl'}`}>
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}
