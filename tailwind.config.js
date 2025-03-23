/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F7FF',
          200: '#BAE7FF',
          300: '#91D5FF',
          400: '#69C0FF',
          500: '#40A9FF', // Primary color
          600: '#1890FF',
          700: '#096DD9',
          800: '#0050B3',
          900: '#003A8C',
        },
        secondary: {
          100: '#F9F0FF',
          200: '#F4EDFF',
          300: '#D3ADF7',
          400: '#B37FEB',
          500: '#9254DE', // Secondary color
          600: '#722ED1',
          700: '#531DAB',
          800: '#391085',
          900: '#22075E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
} 