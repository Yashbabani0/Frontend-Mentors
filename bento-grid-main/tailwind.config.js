/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: 'hsl(254, 88%, 90%)',
          500: 'hsl(256, 67%, 59%)',
        },
        yellow: {
          100: 'hsl(31, 66%, 93%)',
          500: 'hsl(39, 100%, 71%)',
        },
        white: 'hsl(0, 0%, 100%)',
        black: 'hsl(0, 0%, 7%)',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        base: '18px',
      }
    },
  },
  plugins: [],
};
