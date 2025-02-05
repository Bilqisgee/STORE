/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens:{
sm: "340px",
md: "640px",
lg: "1024px",
xl: "1280px",
},    extend: {},
container:{
center: true,
padding: {
  DEFAULT: "12px",
  md: "32px",
} 
},
  },
  darkMode: 'class', // media or class
  plugins: [],
}

