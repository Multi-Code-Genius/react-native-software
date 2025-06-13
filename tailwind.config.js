/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './android/**/*.{js,jsx,ts,tsx}',
    './android/app/src/**/*.{js,jsx,ts,tsx}',
    './src/app/src/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#191919',
        border: '#323232',
        brand: {
          yellow: '#B2C000',
          green: '#5E6600',
          violet: '#8D54FF',
        },
        text: '#FFFFFF',
        lightText: '#121212',
      },
    },
  },
  plugins: [],
};
