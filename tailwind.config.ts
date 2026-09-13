import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-quattrocento)", "Georgia", "serif"],
        sans: ["var(--font-quicksand)", "Helvetica", "sans-serif"],
      },
      colors: {
        brand: {
          dark: "#101010",
          accent: "#b54e71",
          border: "#f5dae3",
          light: "#faf4f6",
        },
      },
      borderRadius: {
        super: "11px",
      },
      boxShadow: {
        super: "rgba(0, 0, 0, 0.12) 0px 20px 40px -10px",
        card: "rgba(0, 0, 0, 0.08) 0px 10px 30px -5px",
        navbar: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
export default config;
