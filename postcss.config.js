// postcss.config.js

module.exports = (ctx) => ({
  plugins: {
    'postcss-import': { root: ctx.file.dirname },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-csso': ctx.env === 'production' ? { comments: false } : false,
  },
})
