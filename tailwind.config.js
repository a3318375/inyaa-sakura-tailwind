module.exports = {
  theme: {
    extend: {
      zIndex: {
        '-999': '-999',
        '999': '999',
      },
      backgroundImage: {
        'img-default': 'url(\'https://media.inyaw.com/cover/7037ade43b1e484eac903a111b7ea709.jpg\')',
        'img-mobile-default': 'url(\'https://media.inyaw.com/cover/14db2cf6e4b441368243b23722d212c9.png\')',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
}
