import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE4',
        'cream-soft': '#EFE4D1',
        green: { DEFAULT: '#0E5B4F', deep: '#09443B', light: '#14715F' },
        orange: '#C65A2E',
        gold: '#B78A52',
        'text-dark': '#1E1E1E',
        'text-muted': '#6A675F',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        sm: '12px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}
export default config