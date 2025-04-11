/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f1117',     // Custom background color
        foreground: '#ffffff',     // Custom text/foreground color
        primary: '#8b5cf6',        // Purple-600 (used for buttons/accents)
        muted: '#9ca3af',          // Gray-400 for secondary text
        error: '#ef4444',          // Red-500 for errors
      },
      spacing: {
        'header': '4rem',          // Consistent header spacing
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),     // Better form input styling
    require('@tailwindcss/typography') // For rich content / scan result
  ],
};
