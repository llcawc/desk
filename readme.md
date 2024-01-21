# Desk - starter template for the front-end

_Version 0.0.1 Date 24.01.08_

Starter uses Gulp as dependencies for front-end's works. For multi page development used NUNJUCKS templating language. On board: [Nunjuck](https://github.com/mozilla/nunjucks) Templates, [TailwindCSS](https://github.com/tailwindlabs/tailwindcss) and import suntax on base [PostCSS](https://github.com/postcss/postcss) witch Autoprefixer and minify plugins. Also used [Rollup](https://github.com/rollup/rollup) witch JSON plugins. Minify scripts: [Terser](https://github.com/terser/terser). Minify image: [Imagemin](https://github.com/imagemin/imagemin). Added a gulp script that allows you to embed the script and style in html.

## Getting started

Install the [node](https://nodejs.org) and the npm package manager, clone this repository in project folder and type this command into the wsl or mac terminal:

```
npm install
```

Default directory:

- For development source files: `src`,
- For server and production: `dist` (will be created after run "dev" or "build")

## Commands

### Develop, watching files and live server reload.

_You can open this in any browser: `http://localhost:3000`_

```
npm run dev
```

### Building files for production.

```
npm run build
```

### Run server (if folder "dist" exist :) in browser.

```
npm run serve
```

### Start inline gulp task to embed the script and style in html.

```
npm run inline
```

## Settings

Use `gulpfile.js`, `package.json` and config files for change settings.

### Bootstrap library for development

If you need to develop [bootstrap](https://getbootstrap.com/) or [bootstrap-icons](https://icons.getbootstrap.com/) libraries, you can install starter ["mockup"](https://github.com/llcawc/mockup), they used sass/scss and bootstrap.

---

MIT License

Сopyright ©2024 pasmurno by [llcawc](https://github.com/llcawc). Made with <span style="color: rgb(230 15 10);">❤</span> for the best architecture
