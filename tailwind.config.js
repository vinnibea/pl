
module.exports = {
    content: [
        "components/**/*.{vue,js,ts}",
        "layouts/**/*.vue",
        "pages/**/*.vue",
        "composables/**/*.{js,ts}",
        "plugins/**/*.{js,ts}",
        "App.{js,ts,vue}",
        "app.{js,ts,vue}",
        "Error.{js,ts,vue}",
        "error.{js,ts,vue}",
        "content/**/*.md",
      ],
    theme: {
     

      extend: {
        fontFamily: {
          montserrat: "'Montserrat', sans-serif;",
          montserrat: "'Montserrat', sans-serif",
        },

        colors: {
          'yellow': '#ffe11d',
          'hover-yellow': '#ffed00',
          'dark-grey': '#505050',
          'button-grey': '#232323',
          'logo-yellow': '#dccf22',
          'navbar-passive': '#6f6f6f',
          'white': '#ffffff',
          'black': '#000',
          'lightgrey': '#bfbfbf',
          'transparent': 'rgba(0, 0, 0, 0)',
          'footer': '#262626',
          'footer-link': '#f8f8f8',
          'input': '#e8ebf0'
        },
        scrollBehavior: {
          'smooth': 'smooth',
        }
      },
    },
    plugins: [],
  }