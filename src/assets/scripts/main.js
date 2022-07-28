// main.js

import { name, version } from '../../../package.json'
import data from './data.js'

console.log('Packet name:', name, 'Version:', version)
console.log(data.text)
console.log('desk site running ...')

document.querySelector('.year').innerHTML = new Date().getFullYear()

window.onload = function () {
  setTimeout(function () {
    document.body.classList.add('loaded')
  }, 200)
}
