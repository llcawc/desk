// main.js

import data from './data.js'

const revision = document.querySelector('#rev')
revision ? revision.innerHTML = 'Revision ' + data.version : console.log('Error: not finding "#rev" selector')

const year = document.querySelector('.year')
year ? year.innerHTML = new Date().getFullYear() : console.log('Error: not finding ".year" selector')

console.log(
  `Package name: "${data.name}". Version: ${data.version}`,
  `\nPackage description: "${data.description}".`,
  '\nJSON.stringify:', JSON.stringify(data))
