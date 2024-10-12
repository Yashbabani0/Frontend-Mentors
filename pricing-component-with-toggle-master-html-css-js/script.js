function togglePrice() {
  // Get all elements with class 'month-price'
  var monthlyPrices = document.querySelectorAll(".month-price");
  // Get all elements with class 'year-price'
  var yearlyPrices = document.querySelectorAll(".year-price");
  // Get the toggle switch element
  var toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

  monthlyPrices.forEach(function (element) {
    if (toggleSwitch.checked) {
      element.style.display = "inline";
    } else {
      element.style.display = "none"; 
    }
  });

  yearlyPrices.forEach(function (element) {
    if (toggleSwitch.checked) {
      element.style.display = "none";
    } else {
      element.style.display = "inline"; 
    }
  });
}

document
  .querySelector('.switch input[type="checkbox"]')
  .addEventListener("change", togglePrice);


togglePrice();


