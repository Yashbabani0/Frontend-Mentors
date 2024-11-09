/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          softCyan: 'hsl(174, 77%, 80%)',
          strongCyan: 'hsl(174, 86%, 45%)',
          lightGrayishRed: 'hsl(14, 92%, 95%)',
          lightRed: 'hsl(15, 100%, 70%)',
          paleBlue: 'hsl(226, 100%, 87%)',
        },
        neutral: {
          white: 'hsl(0, 0%, 100%)',
          veryPaleBlue: 'hsl(230, 100%, 99%)',
          lightGrayishBlueSlider: 'hsl(224, 65%, 95%)',
          lightGrayishBlueToggle: 'hsl(223, 50%, 87%)',
          grayishBlue: 'hsl(225, 20%, 60%)',
          darkDesaturatedBlue: 'hsl(227, 35%, 25%)',
        },
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'intro-paragraph': '15px',
      },
      screens: {
        mobile: '375px',
        desktop: '1440px',
      },
    },
  },
  plugins: [],
} 