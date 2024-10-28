/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          limeGreen: "hsl(163, 72%, 41%)",
          brightRed: "hsl(356, 69%, 56%)",
        },
        social: {
          facebook: "hsl(208, 92%, 53%)",
          twitter: "hsl(203, 89%, 53%)",
          youtube: "hsl(348, 97%, 39%)",
          instagramGradient:
            "bg-gradient-to-r from-[hsl(37,97%,70%)] to-[hsl(329,70%,58%)]",
        },
        toggle: {
          darkTheme:
            "bg-gradient-to-r from-[hsl(210,78%,56%)] to-[hsl(146,68%,55%)]",
          lightTheme: "hsl(230, 22%, 74%)",
        },
        neutral: {
          darkTheme: {
            bg: "hsl(230, 17%, 14%)",
            topBgPattern: "hsl(232, 19%, 15%)",
            cardBg: "hsl(228, 28%, 20%)",
            text: "hsl(228, 34%, 66%)",
            whiteText: "hsl(0, 0%, 100%)",
          },
          lightTheme: {
            bg: "hsl(0, 0%, 100%)",
            topBgPattern: "hsl(225, 100%, 98%)",
            cardBg: "hsl(227, 47%, 96%)",
            text: "hsl(228, 12%, 44%)",
            veryDarkText: "hsl(230, 17%, 14%)",
          },
        },
      },
    },
  },
  plugins: [],
};
