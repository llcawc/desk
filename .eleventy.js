// .eleventy.js

const markdown = require('markdown-it')({ html: true })

module.exports = function (config) {

  config.addPairedShortcode('markdown', (content) => {
    return markdown.render(content)
  })

  return {
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    templateFormats: ['njk', 'md'],
    passthroughFileCopy: true,
    dir: {
      input: 'src/pages',
      output: 'dist',
      // ⚠️ These values refer to the input directory.
      includes: '../includes',
      layouts: '../layouts',
      data: '../data',
    },
  }
}
