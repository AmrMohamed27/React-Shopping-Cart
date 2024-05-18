/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#375A6F",
        "theme-dark-blue": "#05202B",
        "theme-plat": "#E5E6E8",
        "theme-gray": "#B5BFC8",
      },
    },
  },
  plugins: [],
};
