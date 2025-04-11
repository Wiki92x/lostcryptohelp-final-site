/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // App Router pages/components
    './pages/**/*.{js,ts,jsx,tsx}',    // (in case any pages dir)
    './components/**/*.{js,ts,jsx,tsx}' // all your components
  ],
  darkMode: 'class', // Enables dark mode via `class`
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
