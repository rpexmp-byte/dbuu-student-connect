/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // DBUU Official Brand Palette
        dbuuNavy: "#172B52",
        dbuuNavyDark: "#0D1A33",
        dbuuNavyLight: "#223B6B",
        dbuuOrange: "#F58220",
        dbuuCoral: "#FF7E81",
        dbuuCream: "#FFF9F3",
        // Semantic theme colors mapped to DBUU palette
        "color-blue": "#172B52",
        "color-text-darker": "rgb(0,0,0,0.9)",
        "color-text": "rgb(0,0,0,0.6)",
        "color-text-low-emphasis": "#595C5F",
        "color-gray-medium": "#86888A",
        "color-gray-ligth": "#CACCCE",
        "color-button-gray": "#313335",
        "color-button-blue": "#172B52",
        "color-button-blue-darker": "#0D1A33",
        "color-text-accent": "#172B52",
        "color-gray-soft-background": "#eef3f8",
        "color-main-background": "#F1F5F9",
        "color-button-gray-ligth": "rgba(0, 0, 0, 0.45)",
      },
      fontFamily: {
        "source-sans": ["Source Sans", "sans-serif"],
      },
      backgroundImage: {
        "lp-bottom-pattern": "url('./assets/images/bottom-bg.webp')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
