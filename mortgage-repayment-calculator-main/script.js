document.addEventListener('DOMContentLoaded', () => {
    const mortgageAmountInput = document.querySelector('#Mortgage_Amount');
    const mortgageTermInput = document.querySelector('#Mortgage_Term');
    const interestRateInput = document.querySelector('#Interest_Rate');
    const calculateBtn = document.querySelector('button[type="submit"]');
    const resultSection = document.querySelector('.with_result');
    const emptySection = document.querySelector('.empty_without_any_result');
    const monthlyPaymentEl = document.querySelector('.text-lime');
    const totalPaymentEl = document.querySelector('.total_amount_you_ll_over_term');
    const radioButtons = document.querySelectorAll('input[name="emi_or_int"]');
  
    function calculateRepayments() {
      const amount = parseFloat(mortgageAmountInput.value);
      const term = parseInt(mortgageTermInput.value);
      const rate = parseFloat(interestRateInput.value);
      const selectedType = document.querySelector('input[name="emi_or_int"]:checked');
  
      if (isNaN(amount) || isNaN(term) || isNaN(rate) || !selectedType) {
        alert("Please fill in all fields correctly.");
        return;
      }
  
      const totalMonths = term * 12;
      const monthlyRate = rate / 12 / 100;
      let monthlyPayment, totalPayment;
  
      if (selectedType.id === 'Repayment') {
        monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPayment = monthlyPayment * totalMonths;
  
        monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalPaymentEl.textContent = `£${totalPayment.toFixed(2)} `;
  
      } else if (selectedType.id === 'Interest') {
        monthlyPayment = amount * (rate / 100) / 12;
        totalPayment = monthlyPayment * totalMonths;
  
        monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;
      }
  
      resultSection.classList.remove('hidden');
      emptySection.classList.add('hidden');
    }
  
    calculateBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      calculateRepayments();
    });
  
    document.querySelector('form').addEventListener('reset', () => {
      resultSection.classList.add('hidden');
      emptySection.classList.remove('hidden');
      monthlyPaymentEl.textContent = '£0.00';
      totalPaymentEl.textContent = '£0.00';
    });
  });
  