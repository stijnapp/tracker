/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#48A9A6',
          light: '#65bdba',
          dark: '#388482',
        },
        dark: '#2F323A',
      },
    },
  },
  plugins: [],
}

