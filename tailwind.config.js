/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#7335B7',
          secondary: '#F8842B',
          tertiary: '#0C0C0C'
        },
      },
    },
    plugins: [
        require('tailwind-scrollbar-hide') // This plugin hides the scrollbar
    ],
  }
  