const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        accent: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--accent), ${opacityValue})`;
          }
          return `rgb(var(--accent)`;
        },
      },
    },
  },
  plugins: [],
};
