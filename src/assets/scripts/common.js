// common.js

// set current year in copyright
const year = document.querySelector('.year')
if (year) {
  year.innerHTML = new Date().getFullYear()
}

// Code button "back-to-top"

// The function of the button to return to the top of the page
function eventScrollToTop() {
  let flag = false // the visibility flag of the "up" button
  const metka = 300 // the number of pixels of scrolling the page before displaying the "up" button
  const arrowUp = document.querySelector('.back-to-top') // take the node of the button to the top of the page
  if (!arrowUp) {
    throw new Error('The node ".back-to-top" is missing! ')
  }
  window.addEventListener('scroll', function () {
    let counter = this.scrollY
    if (counter > metka) {
      arrowUp.classList.add('up')
      arrowUp.classList.remove('down')
      flag = true
    }
    if (counter <= metka && flag == true) {
      arrowUp.classList.add('down')
      arrowUp.classList.remove('up')
      flag = false
    }
  })
  arrowUp.onclick = function () {
    window.scrollTo({
      left: this.scrollX,
      top: 0,
      behavior: 'smooth',
    })
  }
}

// Launching the scroll To Top button function after the DOM is fully loaded for screens with a viewport of more than 760px
document.addEventListener('DOMContentLoaded', () => {
  let intViewportWidth = window.innerWidth // viwport X
  if (intViewportWidth >= 760) {
    eventScrollToTop()
  }
})
