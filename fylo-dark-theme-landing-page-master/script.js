const button = document.querySelector('.submit')
const error = document.querySelector('.error')

button.addEventListener('click', () => {
    error.classList.remove('hidden');
})