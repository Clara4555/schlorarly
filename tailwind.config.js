const { Colors } = require('./src/app/constants/Colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        ...Colors
      },
      borderRadius:{
        circle: '50%'
      },
      fontFamily:{
        raleway: "Raleway"
      }
    },
  },
  plugins: [
    function ({addComponents}){
      addComponents({
        '.flex-center':{
          'justify-content':'center',
          'align-items':'center'
        }
      });
    }
  ],
}

