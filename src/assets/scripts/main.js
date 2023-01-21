// main.js

import { name, version } from '../../../package.json'
import data from './data.js'

const revision = document.querySelector('#rev')
revision ? revision.innerHTML = 'Revision ' + version : console.log('Error: not finding "#rev" selector')

const year = document.querySelector('.year')
year ? year.innerHTML = new Date().getFullYear() : console.log('Error: not finding ".year" selector')

console.log(
  `Package name: "${name}". Version: ${version}`,
  '\nJSON.stringify:', JSON.stringify(data),
  '\ndata text:', data.text)
