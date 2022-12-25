// postcss.config.js

module.exports = (ctx) => ({
  parser: require('postcss-scss'),
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? { preset: ['default', { discardComments: { removeAll: true } }] } : false,
  },
})
