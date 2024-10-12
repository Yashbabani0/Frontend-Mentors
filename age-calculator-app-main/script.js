"use strict";

// Output Elements
const outputYear = document.querySelector(".output-year");
const outputMonth = document.querySelector(".output-month");
const outputDay = document.querySelector(".output-day");
const btn = document.querySelector("button");

// Input Elements
const inputYear = document.querySelector("#year-input");
const inputMonth = document.querySelector("#month-input");
const inputDay = document.querySelector("#date-input input");
const currentYear = new Date().getFullYear();

// Error Elements
let error = document.querySelectorAll(".error-msg");

// Add event listeners
btn.addEventListener("click", calculateAge);
inputDay.addEventListener("input", validateDay);
inputMonth.addEventListener("input", validateMonth);
inputYear.addEventListener("input", validateYear);

// Event listener for button click
btn.addEventListener("click", calculateAge);

// Event listeners for Enter key press
inputDay.addEventListener("keyup", handleEnterKey);
inputMonth.addEventListener("keyup", handleEnterKey);
inputYear.addEventListener("keyup", handleEnterKey);

// Function to handle Enter key press
function handleEnterKey(event) {
  if (event.key === "Enter") {
    calculateAge();
  }
}

// Function to validate day input
function validateDay() {
  if (+inputDay.value > 31) {
    error[0].textContent = "Enter a valid day";
    error[0].style.display = "block"; // Show the error message
  } else if (+inputDay.value === 0) {
    error[0].textContent = "This field is required";
    error[0].style.display = "block"; // Show the error message
  } else {
    error[0].textContent = "";
    error[0].style.display = "none"; // Hide the error message
  }
}

// Function to validate month input
function validateMonth() {
  if (+inputMonth.value > 12) {
    error[1].textContent = "Enter a valid month";
    error[1].style.display = "block"; // Show the error message
  } else if (+inputMonth.value === 0) {
    error[1].textContent = "This field is required";
    error[1].style.display = "block"; // Show the error message
  } else {
    error[1].textContent = "";
    error[1].style.display = "none"; // Hide the error message
  }
}

// Function to validate year input
function validateYear() {
  if (+inputYear.value > currentYear) {
    error[2].textContent = "Enter a valid year";
    error[2].style.display = "block"; // Show the error message
  } else if (+inputYear.value === 0) {
    error[2].textContent = "This field is required";
    error[2].style.display = "block"; // Show the error message
  } else {
    error[2].textContent = "";
    error[2].style.display = "none"; // Hide the error message
  }
}

// Function to calculate age
function calculateAge() {
  // Validate input fields
  validateDay();
  validateMonth();
  validateYear();

  // Check if there are no errors before proceeding
  if (!error[0].textContent && !error[1].textContent && !error[2].textContent) {
    // Calculate the age
    const enteredDay = +inputDay.value;
    const enteredMonth = +inputMonth.value;
    const enteredYear = +inputYear.value;

    // Date object for the birthdate
    const birthdate = new Date(enteredYear, enteredMonth - 1, enteredDay);

    // Get the current date
    const today = new Date();

    // Calculate age in milliseconds
    const ageInMilliseconds = today - birthdate;

    // Calculate age in years
    const ageInYears = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );

    // Calculate remaining milliseconds after subtracting whole years
    const remainingMilliseconds =
      ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000);

    // Calculate age in months
    const ageInMonths = Math.floor(
      remainingMilliseconds / (30.44 * 24 * 60 * 60 * 1000)
    );

    // Calculate age in days
    const ageInDays = Math.floor(remainingMilliseconds / (24 * 60 * 60 * 1000));

    // Update the output elements
    outputYear.textContent = ageInYears;
    outputMonth.textContent = ageInMonths;
    outputDay.textContent = ageInDays;
  }
}
