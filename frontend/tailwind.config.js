/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-lighblue': '#8EBBFF',
        'custom-black': '#100C08',
        'custom-gray': '#1B1B1B',
        'custom-white':'#f2f2f2 ',
        'cart-img-back':'#f0f0f0',
        'forange':'	#738276',
      },
      gridTemplateColumns:{
        'cart_main_grid':'1.4fr .6fr',
        'allproduct':'.1fr 1fr',
        'allproduct_re':'0fr 1fr',
        'detail_main':'0.9fr 1fr',
        'category':'0.5fr 1fr'
      },
      borderWidth:{
        'cart-boxes':'0.06rem',
        'cart_input_boxes':'0.1rem',
        'cart-img-box':'1px'
      },
      boxShadow:{
        'cart_img':'0 0 10px rgba(0,0,0,.1)'
      }
      ,
      borderColor:{
        'cart-img-color':'rgba(0,0,0,.1)',

      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
          'scrollbar-width': 'none'  /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'  /* Safari and Chrome */
        }
      }, ['responsive'])
    }
  ],
}