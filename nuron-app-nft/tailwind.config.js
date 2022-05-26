module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['DIN-Medium']
    }
    // screens: {
    //   'xs': {'max': '425px'},
    //   'sm': {'min': '425px', 'max': '768px'},
    //   'md': {'min': '769px', 'max': '1024px'},
    //   'lg': {'min': '1025px', 'max': '1280px'},
    //   'xl': {'min': '1281px', 'max': '1535px'},
    //   '2xl': {'min': '1536px'},
    // }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
