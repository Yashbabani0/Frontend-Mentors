/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "hsl(240, 38%, 20%)",
        "grayish-blue": "hsl(240, 18%, 77%)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        body: "32px",
      },
    },
  },
  plugins: [require("daisyui")],
};
