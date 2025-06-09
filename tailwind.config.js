/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: {
          DEFAULT: '#2563EB', // Tailwind blue-600
          light: '#3B82F6',   // Tailwind blue-500
          dark: '#1E40AF',    // Tailwind blue-800
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
