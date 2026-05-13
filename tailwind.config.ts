import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand:      '#F7F3ED',
        parchment: '#EDE8DC',
        mist:      '#D8D0C0',
        stone:     '#8B6B4A',
        clay:      '#C8864A',
        ink:       '#1A1208',
        sage:      '#7A9A68',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
