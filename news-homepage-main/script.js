const close = document.querySelector(".close");
const open = document.querySelector(".open");
const mobileMenu = document.querySelector(".mobile_menu");
const test = document.querySelector(".test");

open.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-[0]");
  mobileMenu.classList.remove("translate-x-[100%]");
  test.classList.remove('hidden')
});
close.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-[0]");
  mobileMenu.classList.add("translate-x-[100%]");
});
