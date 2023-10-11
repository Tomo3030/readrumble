/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors:{
        'primary': '#F35C55',
        'primary-light': '#F2715A',
        'text': '#3A3030',
        'card': '#FFF7E8',
        'accent-green': '#727D71',
        'accent-yellow': '#F6B166'
      },
      fontFamily: {
        'sans': ['Red Hat Text', 'sans-serif'],
        'display': ['Josefin Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

