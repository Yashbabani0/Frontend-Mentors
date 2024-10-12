const MenuIcon = document.querySelector(".menu_icon");
const MenuClose = document.querySelector(".menu_close");
const Menu = document.querySelector("menu");

MenuIcon.addEventListener("click", () => {
  Menu.style.display = "block";
  MenuIcon.style.display = "none";
  MenuClose.style.display = "flex";
});

MenuClose.addEventListener("click", () => {
  Menu.style.display = "none";
  MenuIcon.style.display = "block";
  MenuClose.style.display = "none";
});
