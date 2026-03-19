/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        card: 'var(--bg-card)',
        textMain: 'var(--text-primary)',
        textSec: 'var(--text-secondary)',
        textMut: 'var(--text-muted)',
        accent: 'var(--accent)',
        borderMain: 'var(--border)',
        borderHov: 'var(--border-hover)',
        glow: 'var(--glow)',
        
        chrome: 'var(--chrome)',
        void: 'var(--void)',
        ember: 'var(--ember)',
        starDust: 'var(--star-dust)',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      }
    },
  },
  plugins: [],
}
