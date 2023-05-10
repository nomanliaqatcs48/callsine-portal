/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a76d2",
        primaryLight: "#4595e5",
        primaryDark: "#0758b6",

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
