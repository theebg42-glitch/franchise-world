import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D71920",
          black: "#111111",
          light: "#F5F6F7",
          success: "#22C55E"
        }
      },
      boxShadow: {
        premium: "0 10px 30px -15px rgba(17, 17, 17, 0.22)"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"]
      },
      borderRadius: {
        xl: "0.95rem",
        "2xl": "1.2rem"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #D71920 0%, #ae0b12 100%)"
      }
    }
  },
  plugins: []
};

export default config;
