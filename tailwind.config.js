/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "hammersmith-one": ["hammersmith-one", "sans-serif"],
        inter: ["inter", "sans-serif"],
        "readex-pro": ["readex-pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
