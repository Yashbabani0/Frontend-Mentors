// Mobile Menu
const menuOpen = document.querySelector(".mobileMenuOpen");
const menuClose = document.querySelector(".mobileMenuClose");
const mobileMenu = document.querySelector(".mobileMenu");

menuOpen.addEventListener("click", () => {
  console.log("clicked");

  menuOpen.classList.add("hidden!");
  menuClose.classList.remove("hidden!");
  mobileMenu.classList.remove("hidden");
});

menuClose.addEventListener("click", () => {
  menuClose.classList.add("hidden!");
  menuOpen.classList.remove("hidden!");
  mobileMenu.classList.add("hidden");
});

// API Call for URL Shortening
const error = document.querySelector(".error");
const submit = document.querySelector(".submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const longUrlvalue = document.querySelector(".longUrlvalue").value.trim();
  if (longUrlvalue === "") {
    error.classList.remove("hidden");
    return;
  } else {
    error.classList.add("hidden");
  }

  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
        longUrlvalue
      )}`
    );

    const shortUrl = await response.text(); // TinyURL returns plain text, not JSON

    if (shortUrl.includes("http")) {
      // Retrieve existing links or create an empty array
      const storedLinks =
        JSON.parse(localStorage.getItem("shortenedLinks")) || [];

      // Add the new link
      storedLinks.push({
        longUrl: longUrlvalue,
        shortUrl: shortUrl,
      });

      // Save updated links array
      localStorage.setItem("shortenedLinks", JSON.stringify(storedLinks));

      // Refresh the displayed links
      displayLinksFromLocal();
    } else {
      error.classList.remove("hidden");
    }
  } catch (err) {
    console.error("Error:", err);
    error.classList.remove("hidden");
  }
});

// Function to display links from localStorage
function displayLinksFromLocal() {
  const displayContainer = document.querySelector(".displayLinksHere");
  displayContainer.innerHTML = ""; // Clear previous content

  const storedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];

  if (storedLinks.length === 0) return;

  storedLinks.forEach(({ longUrl, shortUrl }) => {
    const linkElement = document.createElement("div");
    linkElement.className =
      "flex items-center justify-center flex-col lg:flex-row lg:justify-between w-[90%] lg:w-[70%] bg-white rounded-lg p-6 gap-8";

    linkElement.innerHTML = `
      <div>
        <a href="${longUrl}" target="_blank" class="text-Very-Dark-Blue font-semibold longLinkDisplay">
          ${longUrl}
        </a>
      </div>
      <div class="flex items-center justify-center flex-col gap-4 lg:gap-8 lg:flex-row lg:justify-between border-t-2 lg:border-t-0 w-full pt-4 lg:pt-0 border-Gray lg:w-fit">
        <a href="${shortUrl}" target="_blank" class="text-Cyan shortLinkDisplay">${shortUrl}</a>
        <button class="bg-Cyan text-white py-3 px-6 rounded-lg cursor-pointer hover:opacity-80 copyBtn">
          Copy
        </button>
      </div>
    `;

    displayContainer.appendChild(linkElement);

    const copyButton = linkElement.querySelector(".copyBtn");
    copyButton.addEventListener("click", () =>
      copyToClipboard(copyButton, shortUrl)
    );
  });
}

// Function to copy text and change button color temporarily
function copyToClipboard(button, text) {
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = "Copied!";
    button.style.backgroundColor = "hsl(257, 27%, 26%)"; // Dark cyan when clicked

    setTimeout(() => {
      button.textContent = "Copy";
      button.style.backgroundColor = ""; // Reset to default color
    }, 1500);
  });
}

// Call the function to display links on page load
document.addEventListener("DOMContentLoaded", displayLinksFromLocal);
