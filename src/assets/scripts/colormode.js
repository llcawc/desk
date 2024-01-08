// colormode.js
// the script for the color theme switch

const getStoredTheme = () => localStorage.getItem('theme') // считать тему из локального хранилища
const setStoredTheme = (theme) => localStorage.setItem('theme', theme) // записать тему в локальное хранилище
const removeStoredTheme = () => localStorage.removeItem('theme') // убрать ключ в локальном хранилище
const buttonSwicher = document.querySelector('.color-mode-switcher') // взять узел переключателя
if (!buttonSwicher) {
  throw new Error('Ошибка! не найден переключатель цветовых тем с классом .color-mode-switcher')
}
let [light, auto, dark] = buttonSwicher.children // взять подузлы переключателя

// Получить текущую цветовую тему
const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Установить класс 'dark' тега 'html' или убрать его нафиг
const setTheme = (theme) => {
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

setTheme(getPreferredTheme())

// Отобразить переключение на пульте управления цветовыми темами
function showThemeIcon(theme) {
  switch (theme) {
    case 'light':
      light.classList.remove('hidden')
      auto.classList.add('hidden')
      dark.classList.add('hidden')
      break
    case 'auto':
      light.classList.add('hidden')
      auto.classList.remove('hidden')
      dark.classList.add('hidden')
      break
    case 'dark':
      light.classList.add('hidden')
      auto.classList.add('hidden')
      dark.classList.remove('hidden')
  }
}

// Следить за сменой темы в системе
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  let theme = getPreferredTheme()
  showThemeIcon(theme)
  setTheme(theme)
})

// Установить обработчик переключателя цветовых тем
window.addEventListener('DOMContentLoaded', () => {
  // сначала установим правильную иконку цветовой темы
  let usedTheme = getPreferredTheme()
  showThemeIcon(usedTheme)
  // и запустим обработчик новых переключений
  buttonSwicher.addEventListener('click', (ev) => {
    ev.preventDefault()
    let currentMode = ''
    let theme = ''
    ;[...buttonSwicher.children].forEach((el) => {
      if (!el.classList.contains('hidden')) {
        currentMode = el.attributes['data-mode'].value
      }
    })
    switch (currentMode) {
      case 'light':
        showThemeIcon('dark')
        theme = 'dark'
        setStoredTheme()
        break
      case 'auto':
        showThemeIcon('light')
        theme = 'light'
        break
      case 'dark':
        showThemeIcon('auto')
        theme = 'auto'
        removeStoredTheme()
        setTheme(getPreferredTheme())
    }
    if (theme !== 'auto') {
      setStoredTheme(theme)
      setTheme(theme)
    }
  })
})
