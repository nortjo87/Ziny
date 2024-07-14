// tailwind.config.js


module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors:{
          primary:'#55AD9B',
          primarydisable:'#95D2B3',
          secondary:'#4103fc',
          tertiary:'#D8EFD3',
          foreground:'#F1F8E8'
        }
      },
    },
    plugins: [],
  }