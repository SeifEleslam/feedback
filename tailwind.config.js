/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
       keyframes: {
        wave: {
          '0%': { height: '0%', bottom: '100%' },
          '100%': { height: '300px', bottom: '0%'},
        },
      },
      animation: {
        'waving-hand': 'wave 2s linear',
      },
    },
  },
  plugins: [],
}
