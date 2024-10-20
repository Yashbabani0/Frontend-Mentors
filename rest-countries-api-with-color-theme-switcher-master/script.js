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

const name = new URLSearchParams(location.search).get("name");
const flag = document.querySelector(".flag");
const h3 = document.querySelector("h3");

const nativeName = document.querySelector(".native_name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub_region");
const capital = document.querySelector(".capital"); // Fixed typo from "captial" to "capital"
const topLevelDomain = document.querySelector(".top_level_domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");

fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const country = data[0];
    console.log(country);

    // Set flag and country name
    flag.src = country.flags.svg;
    h3.innerText = country.name.common;

    // Set native name
    if (country.name.nativeName) {
      // Get the native names and join them into a string
      const nativeNames = Object.values(country.name.nativeName)
        .map((n) => n.common)
        .join(", ");
      nativeName.innerText = nativeNames;
    } else {
      nativeName.innerText = country.name.common;
    }

    // Set other details
    population.innerText = country.population.toLocaleString(); // Format number with commas
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    capital.innerText = country.capital ? country.capital[0] : "No capital";
    topLevelDomain.innerText = country.tld ? country.tld.join(", ") : "N/A";

    // Set currencies
    if (country.currencies) {
      const currencyNames = Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ");
      currencies.innerText = currencyNames;
    } else {
      currencies.innerText = "N/A";
    }

    // Set languages
    if (country.languages) {
      const languageNames = Object.values(country.languages).join(", ");
      languages.innerText = languageNames;
    } else {
      languages.innerText = "N/A";
    }
    // Set Bordering Countries
    const borderCountry = document.querySelector(".border_country");

    if (country.borders && country.borders.length > 0) {
      // Iterate through the borders array
      country.borders.forEach((border) => {
        const borderCountryButton = document.createElement("button");

        // Set button properties
        borderCountryButton.classList.add(
          "w-[7em]",
          "h-[3em]",
          "text-base",
          "font-light",
          "shadow-md",
          "text-very-dark-blue-text",
          "dark:text-very-light-gray",
          "dark:bg-dark-blue"
        );

        borderCountryButton.innerText = border;

        borderCountry.appendChild(borderCountryButton);

        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((data) => {
            const borderCountryName = data[0].name.common;
            borderCountryButton.innerText = borderCountryName;

            borderCountryButton.addEventListener("click", () => {
              // Update the URL with the selected country's name
              window.location.href = `?name=${borderCountryName}`;
            });
          })
          .catch((error) => {
            console.error(`Error fetching border country data: ${error}`);
            borderCountryButton.innerText = "Unknown";
          });
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
