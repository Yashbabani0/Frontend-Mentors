const b = document.querySelector('b')
const errorImg = document.querySelector('#error-img')
const button = document.querySelector('button')

button.addEventListener('click', function() {
    b.style.display = 'block'
    errorImg.style.display = 'inline'
})