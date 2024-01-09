// colormode.js
// the script for the color theme switch

const getStoredTheme = () => localStorage.getItem('theme') // take a theme name from the local storage
const setStoredTheme = (theme) => localStorage.setItem('theme', theme) // write the name of the theme to the local storage
const removeStoredTheme = () => localStorage.removeItem('theme') // remove the key in the local storage
const buttonSwicher = document.querySelector('.color-mode-switcher') // take the switch node
if (!buttonSwicher) {
  throw new Error('!!! The color theme switch with the .color-mode-switcher class was not found !!!')
}
let [light, auto, dark] = buttonSwicher.children // take the switch subnodes

// Get the current or preferred color theme
const getPreferredTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Install the 'dark' class of the 'html' tag or remove it for fuck's sake
const setTheme = (theme) => {
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Show switching on the color themes control panel
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

// Keep track of the topic change in the system
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  let theme = getPreferredTheme()
  showThemeIcon(theme)
  setTheme(theme)
})

// Install a color theme switch handler
window.addEventListener('DOMContentLoaded', () => {
  let usedTheme = getPreferredTheme()
  // and let's install the theme at launch right away
  setTheme(usedTheme)
  // first, set the correct color theme icon
  showThemeIcon(usedTheme)
  // and we will launch the handler for new switches
  buttonSwicher.addEventListener('click', (ev) => {
    ev.preventDefault()
    let currentMode = ''
    let theme = ''
    // get the attribute name of a non-hidden button
    ;[...buttonSwicher.children].forEach((el) => {
      if (!el.classList.contains('hidden')) {
        currentMode = el.attributes['data-mode'].value
      }
    })
    // circular color mode change button and set new color mode
    switch (currentMode) {
      case 'light':
        showThemeIcon('dark')
        theme = 'dark'
        break
      case 'auto':
        showThemeIcon('light')
        theme = 'light'
        break
      case 'dark':
        showThemeIcon('auto')
        theme = 'auto'
    }
    if (theme !== 'auto') {
      setStoredTheme(theme)
      setTheme(theme)
    } else {
      // if choose the system theme, the color mode takes from window.matchMedia
      removeStoredTheme()
      setTheme(getPreferredTheme())
    }
  })
})
