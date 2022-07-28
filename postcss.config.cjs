// postcss.config.cjs

module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? { preset: ['default', { discardComments: { removeAll: true } }] } : false,
  },
  parser: ctx.file.extname === '.postcss' ? require('postcss-scss') : false,
})
