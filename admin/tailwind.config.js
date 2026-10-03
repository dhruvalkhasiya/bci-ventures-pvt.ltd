/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#003366",
          700: "#002244",
          900: "#001122",
        },
        gold: {
          100: "#fffbeb",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
        ink: "#1e293b",
      },
    },
  },
  plugins: [],
};
