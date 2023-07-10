/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {screens: {
        'tall': { 'raw': '(min-height: 400px)' },
        
      }},
  },
  plugins: [require("@tailwindcss/forms"),require("daisyui")],
   daisyui: {
    
  },
}