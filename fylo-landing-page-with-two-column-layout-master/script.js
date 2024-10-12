const successMsg = document.querySelector(".success_msg");
const footerSuccessMsg = document.querySelector(".footer_success_msg");
const navBtn = document.querySelector(".nav_btn");
const navEmailInput = document.querySelector(".nav_email_input");
const page2InputBox = document.querySelector(".page2_input_box");
const page2InputBtn = document.querySelector(".page2_input_btn");

navBtn.addEventListener("click", function () {
  successMsg.classList.remove("hidden");
  navEmailInput.classList.add("success");
});
page2InputBtn.addEventListener("click", function () {
  footerSuccessMsg.classList.remove("hidden");
  page2InputBox.classList.add("success");
});
