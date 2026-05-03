import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand:      '#F5F0E8',
        parchment: '#EDE8DC',
        mist:      '#D4CEC6',
        stone:     '#C4B89A',
        clay:      '#8B7355',
        ink:       '#2C2416',
        sage:      '#9CAF88',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
