module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '250': '250ms',
      }
    },
  },
  variants: {
    scrollbar: ['dark'],
    extend: {
      transform: ['motion-reduce'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
