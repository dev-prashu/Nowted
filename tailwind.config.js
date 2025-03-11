/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        lightBlack:'#1C1C1C',
        navBlack:'#181818',
      }
    },
  },
  plugins: [],
}

