/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.tsx",
    "./*.html",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto, system-ui, sans-serif'],
    },
    extend: {
      screens: {
        tn: '375px',
        sm: '480px',
        "1sm": '512px',
        xl: '1440px',
        smh: { 'raw': '(min-height: 480px)' },
      },
      maxWidth: {
        md: '480px',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        },
        slideDown: {
          'from': {
            height: '0'
          },
          'to':{
            height: 'var(--radix-collapsible-content-height)'
          }
        },
        
        slideUp: {
          'from': {
            height: 'var(--radix-collapsible-content-height)'
          },
          'to': {
            height: '0'
          }
        }
      },
      animation: {
        wiggle: 'wiggle 300ms ease',
        slideDown: 'slideDown 200ms ease-out',
        slideUp: 'slideUp 200ms ease-out'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  }
}
