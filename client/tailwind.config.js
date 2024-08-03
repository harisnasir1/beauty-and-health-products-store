/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-lighblue': '#8EBBFF',
        'custom-black': '#24293E',
        'custom-gray': '#2F3651',
        'forange':'	#738276',
      },
      textColor: {
        'custom-lighblue': '#8EBBFF',
        'custom-black': '#24293E',
        'custom-gray': '#2F3651',
      },
      borderColor: {
        'custom-lighblue': '#8EBBFF',
        'custom-black': '#24293E',
        'custom-gray': '#2F3651',
      },
      gridTemplateColumns:{
        'ordertableproduct':'1fr .6fr .9fr 1fr'
      }
    },
  },
  plugins: [],
}