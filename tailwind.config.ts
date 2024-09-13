import { colors } from "./src/styles/colors";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        gray: colors.gray,
        darkGray: colors.darkGray,
        lightGray: colors.lightGray,
        mediumGray: colors.mediumGray,
        lightBlack: colors.lightBlack,
        orange: colors.orange,
        purple: colors.purple,
        blue: colors.blue,
      },
      fontFamily: {
        Inter: ['"Inter", sans-serif'],
      },
      boxShadow: {
        dropDownShadow: "44.72px 89.44px 80px 0px #1C242E0A",
      },
    },
  },
  plugins: [],
};
