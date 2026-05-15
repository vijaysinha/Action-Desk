/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
   extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#1e293b",
        },
      },
    },
    fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
  },
  plugins: [],
}

