import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand:      '#FBFAF6',
        parchment: '#F5F1E4',
        mist:      '#E9E4D6',
        stone:     '#6B6350',
        clay:      '#B08D3E',
        ink:       '#1E1B14',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
