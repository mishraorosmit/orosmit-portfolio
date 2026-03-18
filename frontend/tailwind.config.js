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
        chrome: '#C0C0C0',
        void: '#050508',
        ember: '#FF4500',
        starDust: '#8B8FA8',
      },
    },
  },
  plugins: [],
}
