/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#2F2F2F",
        "dark-color": "#202020",
        "secondary-color": "#D9D9D9",
        'yellow': "#E9F555",
      },
    },
  },
  plugins: [typography],
};