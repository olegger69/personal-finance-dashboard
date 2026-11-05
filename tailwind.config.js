/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      colors: {
        paper: '#f5f6f3',
        ink: '#1c2b2a',
        income: '#0f766e',
        expense: '#be3a4b',
      },
    },
  },
  plugins: [],
}
