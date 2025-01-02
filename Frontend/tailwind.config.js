/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "500px",
        "2xs": "400px",
        "2md": "950px",
      },
    },
  },
  plugins: [],
};
