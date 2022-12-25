// rollup.config.js

const {env} = require('node:process')
const {terser} = require('rollup-plugin-terser')
const json = require('@rollup/plugin-json')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')

module.exports = {
  input: 'src/assets/scripts/main.js',
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' }), json()],

  output: {
    file: 'dist/assets/js/main.min.js',
    format: 'iife',
    name: 'main',
    sourcemap: env.BUILD === 'production' ? false : true,
    plugins: env.BUILD === 'production' ? [terser()] : false,
  },
}
