/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './next.config.js',
  ],
  theme: {
    fontFamily: {
      sans: ['ginto-regular', ...defaultTheme.fontFamily.sans],
      heading: ['ginto-bold', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
