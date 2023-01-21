// tailwind.config.js

const baseDir = 'src'

module.exports = {
  content: [
    baseDir + '/**/*.{html,htm}',
    baseDir + '/assets/script/**/*.j',
  ],
  theme: {
    extend: {
      transitionDuration: {
        250: '250ms',
        400: '400ms',
      },
    },
  },
  plugins: [],
}
