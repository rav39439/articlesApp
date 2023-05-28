const path = require('path');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,scss,ts}',
  ],
  theme: {
    'default': {
      primary: {
          ...colors.indigo,
          DEFAULT: colors.indigo[600]
      },
      accent: {
          ...colors.slate,
          DEFAULT: colors.slate[800]
      },
      warn: {
          ...colors.red,
          DEFAULT: colors.red[600]
      },
      'on-warn': {
          500: colors.red['50']
      }
  },
//   fontSize: {
//     'xs': '0.625rem',
//     'sm': '0.75rem',
//     'md': '0.8125rem',
//     'base': '0.875rem',
//     'lg': '1rem',
//     'xl': '1.125rem',
//     '2xl': '1.25rem',
//     '3xl': '1.5rem',
//     '4xl': '2rem',
//     '5xl': '2.25rem',
//     '6xl': '2.5rem',
//     '7xl': '3rem',
//     '8xl': '4rem',
//     '9xl': '6rem',
//     '10xl': '8rem'
// },
screens: {
    xxs:'0px',
    xs: '300px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px'
},

    extend: {
        animation: {
            'spin-slow': 'spin 3s linear infinite'
        },
        colors: {
            gray: colors.slate
        },
        flex: {
            '0': '0 0 auto'
        },
        fontFamily: {
            sans: `"Inter var", ${defaultTheme.fontFamily.sans.join(',')}`,
            mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`
        },
        opacity: {
            12: '0.12',
            38: '0.38',
            87: '0.87'
        },
        rotate: {
            '-270': '270deg',
            '15': '15deg',
            '30': '30deg',
            '60': '60deg',
            '270': '270deg'
        },
        scale: {
            '-1': '-1'
        },
        zIndex: {
            '-1': -1,
            '49': 49,
            '60': 60,
            '70': 70,
            '80': 80,
            '90': 90,
            '99': 99,
            '999': 999,
            '9999': 9999,
            '99999': 99999
        },
        spacing: {
            '13': '3.25rem',
            '15': '3.75rem',
            '18': '4.5rem',
            '22': '5.5rem',
            '26': '6.5rem',
            '30': '7.5rem',
            '50': '12.5rem',
            '90': '22.5rem',

            // Bigger values
            '100': '25rem',
            '120': '30rem',
            '128': '32rem',
            '140': '35rem',
            '160': '40rem',
            '180': '45rem',
            '192': '48rem',
            '200': '50rem',
            '240': '60rem',
            '256': '64rem',
            '280': '70rem',
            '320': '80rem',
            '360': '90rem',
            '400': '100rem',
            '480': '120rem',

            // Fractional values
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%'
        },

    },
  },
  plugins: [


    
  ],
}
