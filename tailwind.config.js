/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'creepy': ['"Creepy"', ...defaultTheme.fontFamily.sans],
        'lunacy': ['"Lunacy"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'mm-yellow': '#FF6D00',
        'mm-orange': '#FFBB89',
      }
    },
  },
  plugins: [],
}

