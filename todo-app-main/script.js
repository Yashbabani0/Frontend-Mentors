// // script.js

// const lightModeImages = {
//   mobile: 'images/bg-mobile-light.jpg',
//   pc: 'images/bg-desktop-light.jpg'
// };

// const darkModeImages = {
//   mobile: 'images/bg-mobile-dark.jpg',
//   pc: 'images/bg-desktop-dark.jpg'
// };

// function updateBackgroundImage() {
//   const isMobile = window.innerWidth <= 767;
//   const isDarkMode = document.body.classList.contains('dark-mode');

//   const images = isDarkMode ? darkModeImages : lightModeImages;
//   document.body.style.backgroundImage = `url(${isMobile ? images.mobile : images.pc})`;
// }

// function toggleMode() {
//   document.body.classList.toggle('dark-mode');
//   updateBackgroundImage();
// }

// window.addEventListener('resize', updateBackgroundImage);
// window.addEventListener('load', updateBackgroundImage);
