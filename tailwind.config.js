/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      gilmer: ['Gilmer', 'sans-serif'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'oxford': '#0F171E', 
        'flame': '#F56025',
        'yonder': '#577399',
        'beau': '#BDD5EA',
        'alice': '#F7FAFF',
        'codeDark': '#22272e'
      },
    },
  },
  plugins: [],
}
