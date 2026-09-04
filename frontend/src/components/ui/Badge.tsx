type BadgeTone = 'teal' | 'ochre' | 'rose' | 'neutral'

const toneClasses: Record<BadgeTone, string> = {
  teal: 'bg-teal-50 text-teal-600',
  ochre: 'bg-ochre-400/15 text-ochre-600',
  rose: 'bg-rose-500/10 text-rose-500',
  neutral: 'bg-ink-50 text-ink-400',
}

const statusToneMap: Record<string, BadgeTone> = {
  Active: 'teal',
  Done: 'teal',
  InProgress: 'ochre',
  Todo: 'neutral',
  Planned: 'neutral',
  Blocked: 'rose',
  OnHold: 'rose',
  Completed: 'teal',
  Urgent: 'rose',
  High: 'ochre',
  Medium: 'neutral',
  Low: 'neutral',
}

export default function Badge({ label, tone }: { label: string; tone?: BadgeTone }) {
  const resolvedTone = tone ?? statusToneMap[label] ?? 'neutral'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[resolvedTone]}`}>
      {label.replace(/([a-z])([A-Z])/g, '$1 $2')}
    </span>
  )
}
