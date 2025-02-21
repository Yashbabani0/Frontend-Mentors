// This Imports from index.html

// Import Form
const form = document.querySelector("form");

// import Classes for Avatar input
const showAddedAvatar = document.querySelector(".showAddedAvatar");
const avatar = document.querySelector("#avatar");
const avatarInfo = document.querySelector(".avatarInfo");
const removeImage = document.querySelector(".removeImage");
const changeImage = document.querySelector(".changeImage");
const avatarWarningAboutImgInfo = document.querySelector(
  ".avatarWarningAboutImgInfo"
);
const avatarErrorForImgSizeTooLarge = document.querySelector(
  ".avatarErrorForImgSizeTooLarge"
);
const avatarImgFileTypeError = document.querySelector(
  ".avatarImgFileTypeError"
);

// Import for Name Input
const nameInput = document.querySelector("#name");

// Import for Email Id Input
const email = document.querySelector("#email");
const emailIdIsInvalid = document.querySelector(".emailIdIsInvalid");
const validUserName = document.querySelector(".validUserName");

// Import for Github Input
const github = document.querySelector("#github");
const githubUserNameError = document.querySelector(".githubUserNameError");

// Import for Submit Button
const submitBtn = document.querySelector("#submitBtn");

// Avatar validation
avatar.addEventListener("change", (e) => {
  const input = e.target;
  const file = input.files[0];
  if (!file) return;

  // Allowed types
  const allowedTypes = ["image/jpeg", "image/png"];

  // Max size allowed
  const maxSize = 500 * 1024;

  // Check if file type is not allowed
  if (!allowedTypes.includes(file.type)) {
    input.value = "";
    avatarWarningAboutImgInfo.classList.add("hidden");
    avatarImgFileTypeError.classList.remove("hidden");
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.classList.remove("cursor-pointer");
    submitBtn.classList.add("cursor-not-allowed");
    return false;
  }
  avatarImgFileTypeError.classList.add("hidden");

  // Check if file size is not more than 500kb
  if (file.size > maxSize) {
    input.value = "";
    avatarWarningAboutImgInfo.classList.add("hidden");
    avatarErrorForImgSizeTooLarge.classList.remove("hidden");

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.classList.remove("cursor-pointer");
    submitBtn.classList.add("cursor-not-allowed");
    return false;
  }
  avatarErrorForImgSizeTooLarge.classList.add("hidden");

  const reader = new FileReader();
  reader.onload = (e) => {
    localStorage.clear();

    const base64Image = e.target.result;
    localStorage.setItem(avatar.id, base64Image);
    showAddedAvatar.src = base64Image;
  };
  reader.readAsDataURL(file);
  showAddedAvatar.classList.remove("p-2");
  showAddedAvatar.classList.add("w-12");
  showAddedAvatar.classList.add("h-12");
  avatarInfo.classList.add("hidden");
  removeImage.classList.remove("hidden");
  changeImage.classList.remove("hidden");
  removeImage.addEventListener("click", (e) => {
    e.preventDefault();
    input.value = "";
    localStorage.removeItem(avatar.id);
    showAddedAvatar.src = "/assets/images/logo-mark.svg";
    removeImage.classList.add("hidden");
    changeImage.classList.add("hidden");
    showAddedAvatar.classList.add("p-2");
    showAddedAvatar.classList.remove("w-12");
    showAddedAvatar.classList.remove("h-12");
    avatarInfo.classList.remove("hidden");
  });
  changeImage.addEventListener("click", (e) => {
    e.preventDefault();
    avatar.click();
    console.log("clicked");
  });
  // Enable submit button
  submitBtn.disabled = false;
  submitBtn.classList.add("cursor-pointer");
  submitBtn.classList.remove("cursor-not-allowed");
});

// Github validation
let debounceTimer;

async function validateGithubUsername() {
  const githubValue = github.value.trim();
  if (!githubValue) {
    validUserName.classList.add("hidden");
    githubUserNameError.classList.remove("hidden");
    return;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${githubValue}`);
      if (res.ok) {
        validUserName.classList.remove("hidden");
        githubUserNameError.classList.add("hidden");
        localStorage.setItem("githubUserName", githubValue);
      } else {
        validUserName.classList.add("hidden");
        githubUserNameError.classList.remove("hidden");
      }
    } catch (err) {
      validUserName.classList.add("hidden");
      githubUserNameError.classList.remove("hidden");
      console.error("An error occurred while checking the username.", err);
    }
  }, 500); // Adjust debounce delay as needed
}

github.addEventListener("input", validateGithubUsername);

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Name value
  const nameValue = nameInput.value;

  // Email validation
  const emailInput = email.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput)) {
    email.value = "";
    emailIdIsInvalid.classList.remove("hidden");
    return;
  } else {
    emailIdIsInvalid.classList.add("hidden");
    localStorage.setItem("EmailId", email.value);
  }

  // Store value to local
  localStorage.setItem("name", nameValue);

  window.location.href = "/ticket.html";
});
