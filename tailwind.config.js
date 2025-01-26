
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
        secondary: '#6b7280',
        danger: '#ef4444',
        warning: '#eab308',
        success: '#16a34a',
        info: '#3b82f6',
        body: {
          light: '#f3f4f6',
          dark: '#1c1e22',
        },
        floating: {
          light: '#ffffff',
          dark: '#16181b',
        },
        light: '#f3f4f6',
        dark: '#2f323a',
      },
    },
  },
  plugins: [],
}

