// Mobile Menu
const menuOpen = document.querySelector(".menuOpen");
const menuClose = document.querySelector(".menuClose");
const menu = document.querySelector(".menu");

menuOpen.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});
menuClose.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

// Carousel
const slides = document.querySelectorAll(".carousel section");
const prevButton = document.querySelectorAll(".left");
const nextButton = document.querySelectorAll(".right");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

nextButton.forEach((button) => button.addEventListener("click", nextSlide));
prevButton.forEach((button) => button.addEventListener("click", prevSlide));

showSlide(currentIndex); // Show the first slide initially
