const optionContainers = document.querySelectorAll(".options");
const form = document.querySelector("form");
const main = document.querySelector("main");
const successfulAlert = document.querySelector(".successful_alert");

optionContainers.forEach((container) => {
  container.addEventListener("click", () => {
    const radioId = container.getAttribute("data-for");
    const radioButton = document.getElementById(radioId);
    if (radioButton) {
      radioButton.checked = true;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.style.pointerEvents = "none";
  main.style.opacity = 0.2;
  successfulAlert.style.display = "block";
  setTimeout(() => {
    location.reload();
  }, 5000);
});
