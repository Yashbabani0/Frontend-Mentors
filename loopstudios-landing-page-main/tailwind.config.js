/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Dark-Gray": "hsl(0, 0%, 55%)",
        "Very-Dark-Gray": "hsl(0, 0%, 41%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
