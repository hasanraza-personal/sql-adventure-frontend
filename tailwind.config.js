/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnightblue: "rgba(39, 0, 81, 0.93)",
        darkorchid: {
          100: "#964ae8",
          200: "rgba(150, 74, 232, 0.16)",
        },
        white: "#fff",
        gray: "rgba(255, 255, 255, 0.21)",
      },
      spacing: {},
      fontFamily: {
        "prosto-one": "'Prosto One'",
        "press-start-2p": "'Press Start 2P'",
      },
    },
  },
  plugins: [],
};
