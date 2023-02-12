# Desk - starter template for the front-end on base tailwind

_Revision 23.02.05_

Starter uses the npm command to develop the front-end. The multi-page work is based on the [PUG](https://github.com/pugjs/pug) template. CSS framework is [TailwindCSS](https://github.com/tailwindlabs/tailwindcss), using nesting and import syntax with Autoprefixer and Nanocss plugins on base [PostCSS](https://github.com/postcss/postcss) engine. To compile and minimize JS, this is using [Rollup](https://github.com/rollup/rollup) with plugins and [Terser](https://github.com/terser/terser). Plugin [Imagemin](https://github.com/imagemin/imagemin) creates images with cleaning and resizing.

## Getting started

Install the [node](https://nodejs.org) and the [npm](https://www.npmjs.com/) package manager, clone this repository in project folder and type this command into the wsl or mac terminal:

```
npm install
```

Default directory:
- For development source files: `src`,
- For server and production: `dist` (will be created after run "dev" or "build")

## Commands

### Develop in browser, watching files and live server reload.
_You can open this in any browser: `http://localhost:3000`_
```
npm run dev
```

### Building files for production.
```
npm run build
```

### Run server (if "dist" exist :) in browser.
```
npm run serve
```

## Settings

Use `package.json` and config files for change settings.

----

Copyright &copy;2023 [llcawc](https://github.com/llcawc), all rights reserved. Made&nbsp;with&nbsp;<span style="color: #e60f0a;">&#10084;</span>&nbsp;for&nbsp;the&nbsp;best&nbsp;architecture.
