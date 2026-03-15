/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pitchsap-dark': '#0B0B0F',
        'pitchsap-purple': '#8B5CF6',
        'pitchsap-violet': '#A855F7',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
      },
    },
  },
  plugins: [],
}