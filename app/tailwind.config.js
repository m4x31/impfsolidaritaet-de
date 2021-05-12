module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          '100': '#E1ECF5',
          '200': '#A4C7E1',
          '300': '#67A1CE',
          '400': '#387AAD',
          '500': '#2F6690',
          '600': '#234C6B',
          '700': '#173247',
          '800': '#0C1924',
          '900': '#060D12',
        },
        secondary: {
          '100': '#FCD7CC',
          '200': '#FAAE99',
          '300': '#F78666',
          '400': '#F6714D',
          '500': '#F46036',
          '600': '#D3360B',
          '700': '#B02D09',
          '800': '#8D2407',
          '900': '#691B06',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
