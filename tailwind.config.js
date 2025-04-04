/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: "#6C47FF",
        secondary: "#8E44AD",
        success: "#4CAF50",
        danger: "#FF5252",
      },
    },
  },
  plugins: [],
};
