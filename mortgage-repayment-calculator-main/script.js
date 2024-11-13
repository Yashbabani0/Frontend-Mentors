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
      // Retrieve inputs
      const amount = parseFloat(mortgageAmountInput.value);
      const term = parseInt(mortgageTermInput.value);
      const rate = parseFloat(interestRateInput.value);
      const selectedType = document.querySelector('input[name="emi_or_int"]:checked');
  
      // Validate inputs
      if (isNaN(amount) || isNaN(term) || isNaN(rate) || !selectedType) {
        alert("Please fill in all fields correctly.");
        return;
      }
  
      // Convert term to months and calculate monthly interest rate
      const totalMonths = term * 12;
      const monthlyRate = rate / 12 / 100;
      let monthlyPayment, totalPayment;
  
      // Calculate based on selected mortgage type
      if (selectedType.id === 'Repayment') {
        // Repayment formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
        monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPayment = monthlyPayment * totalMonths;
  
        // Update the results for Repayment
        monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalPaymentEl.textContent = `£${totalPayment.toFixed(2)} `;
  
      } else if (selectedType.id === 'Interest') {
        // Interest Only formula: Monthly interest payment = (Principal * Annual Rate) / 12
        monthlyPayment = amount * (rate / 100) / 12;
        totalPayment = monthlyPayment * totalMonths;
  
        // Update the results for Interest Only
        monthlyPaymentEl.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalPaymentEl.textContent = `£${totalPayment.toFixed(2)}`;
      }
  
      // Display results and hide empty state
      resultSection.classList.remove('hidden');
      emptySection.classList.add('hidden');
    }
  
    // Add event listener for the calculate button
    calculateBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent form submission
      calculateRepayments();
    });
  
    // Clear results when the form is reset
    document.querySelector('form').addEventListener('reset', () => {
      resultSection.classList.add('hidden');
      emptySection.classList.remove('hidden');
      monthlyPaymentEl.textContent = '£0.00';
      totalPaymentEl.textContent = '£0.00';
    });
  });
  