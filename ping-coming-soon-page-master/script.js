const button = document.querySelector("button");
const errorMsg = document.querySelector(".errorMsg");
const email = document.querySelector("input");

button.addEventListener("click", function () {
  errorMsg.style.display = "block";
  email.style.borderColor = "hsl(354, 100%, 66%)";
});
