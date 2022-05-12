// rollup.config.js

import { env } from 'process'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default {
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
