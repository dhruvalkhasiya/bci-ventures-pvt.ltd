/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B4F8A",  // Deep BCI Blue
          700: "#073B6F",       // Navy Blue (dark text/links)
        },
        gold: {
          DEFAULT: "#FFB800",
          100: "#FFF4CC",
          500: "#FFB800",
          600: "#FFB800",
        },
        ink: "#263238",
        bg: {
          DEFAULT: "#FFFFFF",
          light: "#F4F8FC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgb(11 79 138 / 35%), transparent 50%), radial-gradient(circle at 80% 0%, rgb(255 184 0 / 15%), transparent 40%), linear-gradient(180deg, #073B6F 0%, #0B4F8A 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgb(255 184 0 / 40%), 0 8px 30px rgb(255 184 0 / 15%)",
        glass: "0 8px 32px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
