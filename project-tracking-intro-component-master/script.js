const open = document.querySelector('.mobile_menu_open')
const close = document.querySelector('.mobile_menu_close')
const mobileMenu = document.querySelector('.mobile_menu')

open.addEventListener('click', () => {
    open.classList.add('hidden')
    close.classList.remove('hidden')
    mobileMenu.classList.remove('hidden')
    mobileMenu.classList.add('flex')
})
close.addEventListener('click', () => {
    open.classList.remove('hidden')
    close.classList.add('hidden')
    mobileMenu.classList.remove('flex')
    mobileMenu.classList.add('hidden')
})