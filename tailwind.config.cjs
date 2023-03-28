/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      tn: '375px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      smh: { 'raw': '(min-height: 480px)' },
    },
    extend: {
      minWidth: { 
        '1': '1rem',
        '2': '1.5rem',
        '3': '2rem',
        '4': '2.5rem',
      },
      minHeight: { 
        '4': '2.5rem',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.3s ease',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  }

}
