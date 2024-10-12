const main = document.querySelector("main");
const successMsg = document.querySelector(".success-msg");
const errorMsg = document.querySelector(".error-msg");
const submitBtn = document.querySelector(".submit-btn");
const returnHome = document.querySelector(".return-home");
const displayEmail = document.querySelector(".display-email");
const emailInput = document.querySelector("input");

// validate Email
function validateEmail(email) {
  email = email.trim();

  if (email === "") {
    errorMsg.innerHTML = "Email address is required.";
    errorMsg.style.display = "block"; // Show error message
    emailInput.classList.add("error");
    return false;
  } else {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = pattern.test(email);
    if (!isValid) {
      errorMsg.innerHTML = "Please enter a valid email address.";
      errorMsg.style.display = "block"; // Show error message
      emailInput.classList.add("error");
      return false;
    } else {
      errorMsg.innerHTML = ""; // Clear error message
      errorMsg.style.display = "none"; // Hide error message
      emailInput.classList.remove("error");
      return true;
    }
  }
}

// Add event listener to submit button
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const email = emailInput.value;
  if (validateEmail(email)) {
    // Display success message
    main.style.display = "none";
    successMsg.style.display = "block";

    // Display entered email
    displayEmail.textContent = email;
  }
});

// Add event listener to "Dismiss message" button
returnHome.addEventListener("click", function (event) {
  event.preventDefault();

  // Hide success message and show main content
  successMsg.style.display = "none";
  main.style.display = "flex";
});
