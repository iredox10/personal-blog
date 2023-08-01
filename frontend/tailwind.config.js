/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: 'rgba(233, 245, 85, 1)',
        cardColor: '#202020',
        sideBarColor: 'rgba(32, 32, 32, 0.76)',
        searchColor: '#BABABA'
      }
    },
  },
  plugins: [
    typography,
  ],
}