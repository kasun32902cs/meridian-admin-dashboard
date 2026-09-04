/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#16232B',
          50: '#EEF1F3',
          100: '#D9E0E4',
          400: '#4B5F6B',
          700: '#233440',
          800: '#1B2933',
          900: '#16232B',
        },
        canvas: '#F1F3F1',
        teal: {
          50: '#E7F1EF',
          100: '#CCE3DF',
          400: '#2C8F87',
          500: '#1F6F6B',
          600: '#185A57',
          700: '#124542',
        },
        ochre: {
          400: '#D6A24E',
          500: '#C98A3E',
          600: '#A96F2E',
        },
        rose: {
          500: '#C1554A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(22, 35, 43, 0.06), 0 1px 0 rgba(22, 35, 43, 0.04)',
      },
      borderRadius: {
        md: '0.5rem',
      },
    },
  },
  plugins: [],
}
