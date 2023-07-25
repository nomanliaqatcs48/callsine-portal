/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      comfortaa: ["Comfortaa", "sans-serif"],
    },
    extend: {
      screens: {
        "3xl": "1800px",
        "4xl": "1920px",
      },
      colors: {
        primary: "#1976d2",
        primaryLight: "#3e8fe7",
        primaryDark: "#0758b6",
        veryPrimaryLight: "#f8fbff",

        callsineGray: "#778da9",
        callsineLightBlue: "#0096c7",
        callsineVeryLightBlue: "#2dafda",

        cyan: "hsl(180, 66%, 49%)",
        cyanLight: "hsl(180, 66%, 69%)",
        strongCyan: "hsl(171, 66%, 44%)",

        lightBlue: "hsl(233, 100%, 69%)",
        darkGrayishBlue: "hsl(210, 10%, 33%)",
        grayishBlue: "hsl(201, 11%, 66%)",
        veryDarkBlue: "hsl(255, 11%, 22%)",

        darkViolet: "hsl(257, 27%, 26%)",
        grayishViolet: "hsl(257, 7%, 63%)",
        veryDarkViolet: "hsl(260, 8%, 14%) ",
      },
    },
  },
  plugins: [],
};
