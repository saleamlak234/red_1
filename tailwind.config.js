/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'abyssinica': ['Abyssinica SIL', 'serif'],
        'tienne': ['Tienne', 'serif'],
        'tinos': ['Tinos', 'serif'],
      },
      colors: {
        'card-blue': 'rgb(13, 12, 103)',
        'border-blue': 'rgb(5, 3, 92)',
        'text-blue': 'rgb(22, 73, 175)',
        'level-blue': 'rgb(6, 62, 173)',
      },
      spacing: {
        'card-width': '3.37in',
        'card-height': '2.125in',
      },
      blur: {
        'xs': '0.5px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}