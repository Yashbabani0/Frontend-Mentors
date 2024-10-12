function handleRatingClick(event) {
  const selectedRating = event.target;

  document.querySelectorAll(".ratings").forEach((btn) => {
    btn.classList.remove("ratings-selected");
  });

  selectedRating.classList.add("ratings-selected");
}

document.querySelectorAll(".ratings").forEach((btn) => {
  btn.addEventListener("click", handleRatingClick);
});

document.querySelector("#submit-btn").addEventListener("click", function () {
  const selectedRating = document.querySelector(".ratings-selected");

  if (selectedRating) {
    document.querySelector(".Show-selected-stars-number").textContent =
      selectedRating.textContent;

    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
  } else {
    alert("Please select a rating before submitting.");
  }
});
