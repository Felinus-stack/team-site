/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "rgb(203, 31, 58)",
        customRedTransparent: "rgba(203, 31, 58, 0.2)",
      },
      fontSize: {
        "6xl": "6rem",
      },
      keyframes: {
        rotateX: {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(90deg)", opacity: 0 },
          "100%": { transform: "rotateX(180deg)", opacity: 1 },
        },
      },
      animation: {
        "rotate-y-180": "rotateX 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
