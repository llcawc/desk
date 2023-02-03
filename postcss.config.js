// postcss.config.js

module.exports = (ctx) => ({
  parser: require('postcss-scss'),
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-csso': ctx.env === 'production' ? { comments: false } : false,
  },
})
