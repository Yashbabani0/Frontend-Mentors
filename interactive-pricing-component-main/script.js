const billingToggle = document.getElementById('billingToggle');
const priceElement = document.querySelector('.price');
const month_Year = document.querySelector('.month_year');
const range = document.querySelector('.changePrice');
const pageViewsElement = document.querySelector('.page_views');

billingToggle.addEventListener('change', () => {
  console.log(`Checkbox is checked: ${billingToggle.checked}`);
  updatePrice();
});

range.addEventListener('input', () => {
  updatePrice(); 
});

function updatePrice() {
  const rangeValue = range.value;

  let price = 0;
  let pageViews = '';
  
  if (rangeValue == 1) {
    pageViews = '10k';
    price = billingToggle.checked ? (8 * 12) * 0.75 : 8; // Apply 25% discount on yearly
  } else if (rangeValue == 2) {
    pageViews = '50k';
    price = billingToggle.checked ? (12 * 12) * 0.75 : 12;
  } else if (rangeValue == 3) {
    pageViews = '100k';
    price = billingToggle.checked ? (16 * 12) * 0.75 : 16;
  } else if (rangeValue == 4) {
    pageViews = '500k';
    price = billingToggle.checked ? (24 * 12) * 0.75 : 24;
  } else if (rangeValue == 5) {
    pageViews = '1M';
    price = billingToggle.checked ? (36 * 12) * 0.75 : 36;
  }
  
  pageViewsElement.textContent = pageViews;
  priceElement.textContent = price.toFixed(2);
  
  if (billingToggle.checked) {
    month_Year.innerHTML = '&nbsp;/ yearly';
  } else {
    month_Year.innerHTML = '&nbsp;/ month';
  }
}

updatePrice();
