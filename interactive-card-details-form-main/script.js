document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.querySelector("#nameInput");
  const numberInput = document.querySelector("#numberInput");
  const monthInput = document.querySelector("#monthInput");
  const yearInput = document.querySelector("#yearInput");
  const cvcInput = document.querySelector("#cvcInput");
  const viewCardNumber = document.querySelector(".card_number");
  const viewCardName = document.querySelector(".cardholder_name");
  const viewCardDate = document.querySelector(".card_date");
  const viewCardMonth = document.querySelector(".card_month");
  const viewCardCvc = document.querySelector(".cvv");
  const complete = document.querySelector(".complete");
  const errorMsg = document.querySelectorAll(".errorvalue");
  const mainBtn = document.querySelector("#mainBtn");
  const continueBtn = document.querySelector("#continueBtn");

  function setCardNumber(e) {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim();
    viewCardNumber.innerText = value;
  }

  function setCardName(e) {
    let value = e.target.value;
    viewCardName.innerText = value;
  }

  function setCardMonth(e) {
    let value = e.target.value;
    viewCardDate.innerText = value;

    if (/\D/.test(value) || value < 1 || value > 12) {
      monthInput.classList.add("error");
      errorMsg[2].style.display = "block";
    } else {
      monthInput.classList.remove("error");
      errorMsg[2].style.display = "none";
    }
  }

  function setCardYear(e) {
    let value = e.target.value;
    viewCardMonth.innerText = value;

    if (/\D/.test(value)) {
      yearInput.classList.add("error");
      errorMsg[2].style.display = "block";
    } else {
      yearInput.classList.remove("error");
      errorMsg[2].style.display = "none";
    }
  }

  function setCVC(e) {
    let value = e.target.value;
    viewCardCvc.innerText = value;

    if (/\D/.test(value)) {
      cvcInput.classList.add("error");
      errorMsg[3].style.display = "block";
    } else {
      cvcInput.classList.remove("error");
      errorMsg[3].style.display = "none";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;

    errorMsg.forEach((error) => {
      error.style.display = "none";
    });

    if (!nameInput.value) {
      nameInput.classList.add("error");
      errorMsg[0].style.display = "block";
      hasError = true;
    } else {
      nameInput.classList.remove("error");
      errorMsg[0].style.display = "none";
    }

    if (!numberInput.value || numberInput.value.length < 16) {
      numberInput.classList.add("error");
      errorMsg[1].style.display = "block";
      hasError = true;
    } else {
      numberInput.classList.remove("error");
      errorMsg[1].style.display = "none";
    }

    if (
      !monthInput.value ||
      !yearInput.value ||
      monthInput.value.length !== 2 ||
      yearInput.value.length !== 2 ||
      /\D/.test(yearInput.value)
    ) {
      monthInput.classList.add("error");
      yearInput.classList.add("error");
      errorMsg[2].style.display = "block";
      hasError = true;
    } else {
      monthInput.classList.remove("error");
      yearInput.classList.remove("error");
      errorMsg[2].style.display = "none";
    }

    if (
      !cvcInput.value ||
      cvcInput.value.length !== 3 ||
      /\D/.test(cvcInput.value)
    ) {
      cvcInput.classList.add("error");
      errorMsg[3].style.display = "block";
      hasError = true;
    } else {
      cvcInput.classList.remove("error");
      errorMsg[3].style.display = "none";
    }

    // If there's an error, stop form submission
    if (hasError) {
      return;
    }

    // If form is valid, hide error messages
    complete.style.display = "flex";
    if (cardForm) {
      cardForm.classList.add("hidden");
    }
  }

  function reloadPage() {
    location.reload();
  }

  numberInput.addEventListener("input", setCardNumber);
  nameInput.addEventListener("input", setCardName);
  monthInput.addEventListener("input", setCardMonth);
  yearInput.addEventListener("input", setCardYear);
  cvcInput.addEventListener("input", setCVC);

  mainBtn.addEventListener("click", handleSubmit);
  continueBtn.addEventListener("click", reloadPage);
});
