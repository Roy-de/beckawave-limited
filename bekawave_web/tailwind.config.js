import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'sans serif', 'serif'],
      },
      fontWeight: {
        regular: 400, // Regular weight
        medium: 500,  // Medium weight
        bold: 700,    // Bold weight
      },
      boxShadow: {
        'soft': '0 10px 20px rgba(0, 0, 0, 0.1)', // Customize shadow here
      },
    },
  },
 plugins: [nextui()],
}
