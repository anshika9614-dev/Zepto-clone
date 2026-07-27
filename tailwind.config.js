/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        zepto: {
          purple: "#950EDB",
          "purple-light": "#B347F0",
          "purple-dark": "#7A0CB8",
          "purple-50": "#F5E6FF",
          "purple-100": "#E6CCFF",
          yellow: "#F5C518",
          green: "#0C831F",
          "green-light": "#1AB946",
          red: "#E0353B",
          gray: "#586274",
          "gray-light": "#828282",
          "gray-bg": "#F8F8F8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
