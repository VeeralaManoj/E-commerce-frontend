import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        paper: "#faf9f6",
        brand: {
          50: "#edf7f4",
          100: "#d5ede6",
          500: "#227c70",
          600: "#17665d",
          900: "#0d332f"
        },
        coral: "#d96846"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(20, 20, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
