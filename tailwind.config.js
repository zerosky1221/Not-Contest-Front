import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0088CC",
          50: "#E6F4FB",
          100: "#CCE9F7",
          200: "#99D3EF",
          300: "#66BDE7",
          400: "#33A7DF",
          500: "#0088CC",
          600: "#006DA3",
          700: "#00517A",
          800: "#003652",
          900: "#001A29",
        },
        dark: {
          DEFAULT: "#121212",
          100: "#1E1E1E",
          200: "#2C2C2C",
          300: "#3D3D3D",
          400: "#5A5A5A",
          500: "#818181",
          600: "#A3A3A3",
          700: "#C6C6C6",
          800: "#E8E8E8",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundColor: {
        'theme': 'var(--bg-color)',
        'card': 'var(--card-bg)',
      },
      textColor: {
        'theme': 'var(--text-color)',
      },
      borderColor: {
        'theme': 'var(--border-color)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};