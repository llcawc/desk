// common.js

const year = document.querySelector('.year')
if (year) {
  year.innerHTML = new Date().getFullYear()
}

// функция работы кнопки возврата на верх страницы
function eventScrollToTop() {
  let flag = false // флаг видимости кнопки "на верх"
  const metka = 300 // число пикселей прокрутки страницы до отображения кнопки "на верх"
  const arrowUp = document.querySelector('.back-to-top') // взять узел кнопки пехода на верх страницы

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
    // event.preventDefault();
    window.scrollTo({
      left: this.scrollX,
      top: 0,
      behavior: 'smooth',
    })
  }
}

// Запуск функции работы кнопки scrollToTop после полной загрузки DOM для экранов с viwport более 340px
document.addEventListener('DOMContentLoaded', () => {
  let intViewportWidth = window.innerWidth // viwport X
  // let intViewportHeight = window.innerHeight // viewport Y
  if (intViewportWidth >= 760) {
    eventScrollToTop()
  }
})
