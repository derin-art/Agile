/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Josefin: ["Josefin", "san-serif"],
        Rampart: ["Rampart", "san-serif"],
      },
    },
  },
  plugins: [Myclass, require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
