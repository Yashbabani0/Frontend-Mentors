const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
  htmlElement.classList.add("dark");
} else {
  htmlElement.classList.remove("dark");
}

// Toggle theme on click and save the preference in localStorage
themeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
});

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Moved inside this .then block to correctly log the data
    
    data.forEach((country) => {
      const main = document.querySelector("main");
      const countryCard = document.createElement("a");
      countryCard.classList.add(
        "card",
        "w-[16em]",
        "shadow-md",
        "rounded-md",
        "h-[20em]",
        "overflow-hidden",
        "bg-white",
        "dark:bg-dark-blue",
        "transition-colors",
        "duration-300"
      );

      countryCard.innerHTML = `
        <div class="img max-h-[10em] overflow-hidden">
          <img
            class="h-full w-full object-cover"
            src="${country.flags.svg}"
            alt="Flag of ${country.name.common}"
          />
        </div>
        <div class="h-[10em] w-full flex flex-col items-start justify-center p-8 dark:text-very-light-gray">
          <div class="name mb-2">
            <h3 class="font-extrabold text-xl dark:text-very-light-gray">${country.name.common}</h3>
          </div>
          <div class="data text-very-dark-blue-text dark:text-very-light-gray text-base">
            <p><b class="font-semibold">Population: </b><span class="font-light">${country.population.toLocaleString()}</span></p>
            <p><b class="font-semibold">Region: </b><span class="font-light">${country.region}</span></p>
            <p><b class="font-semibold">Capital: </b><span class="font-light">${country.capital ? country.capital[0] : "N/A"}</span></p>
          </div>
        </div>
      `;

      main.append(countryCard);
    });
  });
