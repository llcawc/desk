// main.js

import { name, version, date } from '../../../package.json'
import data from './data.js'

const revision = document.querySelector('#rev')
revision ? revision.innerHTML = 'Version: ' + version + ' Date: ' + date: console.log('Error: not finding "#rev" selector')

const year = document.querySelector('.year')
year ? year.innerHTML = new Date().getFullYear() : console.log('Error: not finding ".year" selector')

console.log(
  `Package name: "${name}". Version: ${version}. Date: ${date}`,
  '\nJSON.stringify:', JSON.stringify(data),
  '\ndata text:', data.text)
