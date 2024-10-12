const amount = document.getElementById("add_amount_input");
const percentageButtons = document.querySelectorAll(".tips");
const customTip = document.getElementById("custom_tip");
const numberOfPeople = document.getElementById("number_of_people_input");
const totalAmount = document.getElementById("total_amount");
const tipAmount = document.getElementById("tip_amount");
const reset = document.querySelector(".reset");
const error = document.querySelector(".error");

let billAmount = 0;
let tipPercentage = 0;
let peopleCount = 1;

amount.addEventListener("input", () => {
  billAmount = parseFloat(amount.value) || 0;
  calculateTip();
});

percentageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    percentageButtons.forEach((btn) => btn.classList.remove("active_tip"));
    button.classList.add("active_tip");
    tipPercentage = parseFloat(button.textContent) / 100;
    customTip.value = "";
    calculateTip();
  });
});

customTip.addEventListener("input", () => {
  tipPercentage = parseFloat(customTip.value) / 100 || 0;
  percentageButtons.forEach((btn) => btn.classList.remove("active_tip"));
  calculateTip();
});

numberOfPeople.addEventListener("input", () => {
  peopleCount = parseInt(numberOfPeople.value);
//   console.log('Number of People:', peopleCount); // Log the value

  if (peopleCount === 0) {
    error.style.display = "block";
    numberOfPeople.classList.add("error_input");
  } else {
    error.style.display = "none";
    numberOfPeople.classList.remove("error_input");
  }
  calculateTip();
});

reset.addEventListener("click", () => {
  billAmount = 0;
  tipPercentage = 0;
  peopleCount = 1;
  amount.value = "";
  customTip.value = "";
  numberOfPeople.value = "";
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  percentageButtons.forEach((button) => button.classList.remove("active_tip"));
  error.style.display = "none";
  numberOfPeople.classList.remove("error_input");
});

function calculateTip() {
  if (peopleCount >= 1) {
    const tip = (billAmount * tipPercentage) / peopleCount;
    const total = (billAmount * (1 + tipPercentage)) / peopleCount;
    tipAmount.textContent = `$${tip.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
}
