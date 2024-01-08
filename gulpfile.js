// gulpfile.js • frontend • nunjucks • tailwindcss • pasmurno by llcawc • https://github.com/llcawc

// import modules
import fs from 'fs'
import { env } from 'process'
import gulp from 'gulp'
const { src, dest, parallel, series, watch } = gulp
import browsersync from 'browser-sync'
const bs = browsersync.create()
import { nunjucksCompile } from 'gulp-nunjucks' // About nunjucks: https://mozilla.github.io/nunjucks/
import htmlmin from 'gulp-htmlmin'
import prettier from 'gulp-prettier'
import tailwindcss from 'tailwindcss'
import tailwindNesting from 'tailwindcss/nesting/index.js'
import postcss from 'gulp-postcss'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import csso from 'postcss-csso'
import { rollup } from 'rollup'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { minify } from 'terser'
import gulpTerser from 'gulp-terser'
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import { deleteAsync as del } from 'del'

// variables & path
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
const fileswatch = 'njk,htm,html,sass,scss,css,pcss,js,cjs,mjs,jpg,png,gif,svg,ico,webp,avif,json,txt,md,woff2'
let paths = {
  scripts: {
    src: baseDir + '/assets/scripts/main.js',
    min: distDir + '/assets/js/main.min.js',
    dest: distDir + '/assets/js',
  },
  styles: {
    src: baseDir + '/assets/styles/*.css',
    min: distDir + '/assets/css/main.min.css',
    dest: distDir + '/assets/css',
  },
  images: {
    src: baseDir + '/assets/images/**/*.{jpg,png,svg}',
    dest: distDir,
  },
  clean: [distDir + '/**', distDir + '/assets/**', '!' + distDir + '/assets', '!' + distDir + '/assets/images'],
  copy: {
    src: [baseDir + '/assets/fonts/**/*.*', baseDir + '/assets/images/favicon.ico', baseDir + '/.htaccess'],
  },
}

//  server reload task
function browserSync() {
  bs.init({
    server: { baseDir: distDir },
    online: true,
    notify: false,
    open: false,
  })
}

// html assembly task
function htm() {
  if (env.BUILD === 'production') {
    return src(baseDir + '/*.{njk,htm,html}', { base: baseDir })
      .pipe(nunjucksCompile().on('Error', (err) => console.log(err)))
      .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
      .pipe(dest(distDir))
  } else {
    return src(baseDir + '/*.{njk,htm,html}', { base: baseDir })
      .pipe(nunjucksCompile().on('Error', (err) => console.log(err)))
      .pipe(prettier({ parser: 'html' }))
      .pipe(dest(distDir))
  }
}

// scripts task
async function scripts() {
  const bundle = await rollup({
    input: paths.scripts.src,
    plugins: [resolve(), commonjs({ include: 'node_modules/**' }), babel({ babelHelpers: 'bundled' }), json()],
  })
  await bundle.write({
    file: paths.scripts.min,
    format: 'iife',
    name: 'main',
    sourcemap: env.BUILD === 'production' ? false : true,
  })
  // code minify task
  if (env.BUILD === 'production') {
    return src(paths.scripts.min)
      .pipe(gulpTerser({ compress: { passes: 2 }, format: { comments: false } }, minify))
      .pipe(dest(paths.scripts.dest))
  }
}

// inline scripts
function inlinescripts() {
  return src(distDir + '/**/*.html', { base: distDir })
    .pipe(
      replace(/<script src="assets\/js\/main.min.js"><\/script>/, () => {
        const script = fs.readFileSync(distDir + '/assets/js/main.min.js', 'utf8')
        return '<script>' + script + '</script>'
      })
    )
    .pipe(dest(distDir))
}

// styles task
function styles() {
  if (env.BUILD === 'production') {
    return src(paths.styles.src)
      .pipe(postcss([postcssImport, tailwindNesting, tailwindcss, autoprefixer, csso({ comments: false })]))
      .pipe(rename({ suffix: '.min', extname: '.css' }))
      .pipe(dest(paths.styles.dest))
  } else {
    return src(paths.styles.src, { sourcemaps: true })
      .pipe(postcss([postcssImport, tailwindNesting, tailwindcss]))
      .pipe(rename({ suffix: '.min', extname: '.css' }))
      .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
  }
}

// inline styles
function inlinestyles() {
  return src(distDir + '/**/*.html', { base: distDir })
    .pipe(
      replace(/<link rel="stylesheet" href="assets\/css\/main.min.css">/, () => {
        const style = fs.readFileSync(distDir + '/assets/css/main.min.css', 'utf8')
        return '<style>' + style + '</style>'
      })
    )
    .pipe(dest(distDir))
}

// images task
function images() {
  return src(paths.images.src, { base: baseDir })
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({ verbose: 'true' }))
    .pipe(dest(paths.images.dest))
}

// clean task
function clean() {
  return del(paths.clean)
}
// post clean task
function postclean() {
  return del([distDir + '/assets/css/main.min.css', distDir + '/assets/js'])
}

// copy task
function copy() {
  return src(paths.copy.src, { base: baseDir }).pipe(dest(distDir))
}

// watch
function watchDev() {
  watch(`./${baseDir}/**/*.{njk,htm,html}`, { usePolling: true }, parallel(htm, styles))
  watch(`./${baseDir}/assets/scripts/**/*.{js,mjs,cjs}`, { usePolling: true }, parallel(scripts))
  watch(`./${baseDir}/assets/styles/**/*.{sass,scss,css,pcss}`, { usePolling: true }, parallel(htm, styles))
  watch(`./${baseDir}/assets/images/**/*.{jpg,png,svg,gif}`, { usePolling: true }, parallel(images))
  watch(`./${baseDir}/**/*.{${fileswatch}}`, { usePolling: true }).on('change', bs.reload)
}

// export
export default htm
export { copy, clean, images, scripts, styles }
export let inline = series(inlinescripts, inlinestyles, postclean)
export let assets = series(copy, images, htm, scripts, styles)
export let serve = parallel(browserSync, watchDev)
export let dev = series(clean, assets, serve)
export let build = series(clean, assets)