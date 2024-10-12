const firstName = document.querySelectorAll("#firstName");
const lastName = document.querySelectorAll("#lastName");
const email = document.querySelectorAll('input[type="email"]');
const password = document.querySelectorAll('input[type="password"]');
const submitBtn = document.querySelector('button[type="submit"]');
const errorMsg = document.querySelectorAll(".error-msg");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  errorMsg.forEach(function (msg) {
    msg.style.display = "block";
  });
  firstName.forEach(function (input) {
    input.classList.add("input-with-error");
  });
  lastName.forEach(function (input) {
    input.classList.add("input-with-error");
  });

  email.forEach(function (input) {
    input.classList.add("input-with-error");
  });

  password.forEach(function (input) {
    input.classList.add("input-with-error");
  });
});
