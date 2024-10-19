const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme in localStorage
if (localStorage.getItem('theme') === 'dark') {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

// Toggle theme on click and save the preference in localStorage
themeToggle.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
console.log(response.json());

// .then(data => {
//     displayCountries(data);
// })