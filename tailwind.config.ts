import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f6fc",
          100: "#dceaf7",
          200: "#b9d4ee",
          500: "#3b7cb8",
          600: "#2563a8",
          700: "#1e4f86",
          800: "#1a426e",
          900: "#16365a",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-jp)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 8px 30px rgba(22, 54, 90, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
