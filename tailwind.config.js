/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bump: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(0.9)' },
          '30%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-3rem)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        bump: 'bump 300ms ease-out',
        slideDown: 'slideDown 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
