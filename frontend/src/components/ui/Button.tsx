import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variantClasses: Record<string, string> = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600',
  secondary: 'bg-white border border-ink-100 text-ink-900 hover:border-ink-400/40',
  ghost: 'text-ink-400 hover:text-ink-900',
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
