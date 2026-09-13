import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf8f5",
          100: "#f4efe8",
          200: "#e8ded2",
          300: "#d7c6b2",
          400: "#c3a98f",
          500: "#b59473",
          600: "#a68263",
          700: "#8b6a51",
          800: "#715744",
          900: "#5c483a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
