// buttons.js

const buttons = document.querySelectorAll('.mybtn')

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    e.preventDefault() // preventing for submitting

    let overlay = document.createElement('span') // creating a element span
    overlay.classList.add('overlay') // add a class iside the span

    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop

    overlay.style.left = x + 'px'
    overlay.style.top = y + 'px'

    e.target.appendChild(overlay)

    setTimeout(()=>{
      overlay.remove()
    }, 500) // remove span overlay after 0.5s of click
  })
}
