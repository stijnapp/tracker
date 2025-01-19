
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#1d8098',
        secondary: '#ff6347',
        danger: '#ef4444',
        warning: '#eab308',
        success: '#16a34a',
        info: '#3b82f6',
        light: '#f3f4f6',
        dark: '#2f323a',
      },
    },
  },
  plugins: [],
}

