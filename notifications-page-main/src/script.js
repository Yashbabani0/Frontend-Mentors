const notefi1 = document.querySelector(".notefi1");
const notefi2 = document.querySelector(".notefi2");
const notefi3 = document.querySelector(".notefi3");
const redDot1 = document.querySelector(".redDotFornot1");
const redDot2 = document.querySelector(".redDotFornot2");
const redDot3 = document.querySelector(".redDotFornot3");
const clearAllNot = document.querySelector(".clearAllNot");
const numberOfUnreadNote = document.querySelector(".numberOfUnreadNote");

let currentlyNumberOfUnreadnotifcation = 3;

function updateUnreadCount() {
  let unreadCount = 0;
  if (!redDot1.classList.contains("hidden")) unreadCount++;
  if (!redDot2.classList.contains("hidden")) unreadCount++;
  if (!redDot3.classList.contains("hidden")) unreadCount++;

  currentlyNumberOfUnreadnotifcation = unreadCount;
  numberOfUnreadNote.textContent = currentlyNumberOfUnreadnotifcation;
}

function toggleNotification(notifiElement, redDotElement) {
  notifiElement.classList.toggle("bg-Light-grayish-blue-1");
  redDotElement.classList.toggle("hidden");
  updateUnreadCount();
}

notefi1.addEventListener("click", () => {
  toggleNotification(notefi1, redDot1);
});

notefi2.addEventListener("click", () => {
  toggleNotification(notefi2, redDot2);
});

notefi3.addEventListener("click", () => {
  toggleNotification(notefi3, redDot3);
});

clearAllNot.addEventListener("click", () => {
  notefi1.classList.remove("bg-Light-grayish-blue-1");
  notefi2.classList.remove("bg-Light-grayish-blue-1");
  notefi3.classList.remove("bg-Light-grayish-blue-1");
  redDot1.classList.add("hidden");
  redDot2.classList.add("hidden");
  redDot3.classList.add("hidden");

  updateUnreadCount();
});
