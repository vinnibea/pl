
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
        'bg-primary': '#ffffff',
        'button-primary': '#F85A5A',
        'button-primary-hover': '#E94040',
        'button-text-primary': '#ffffff',
        'dark-grey': '#505050',
        'button-grey': '#232323',
        'bg-main': '#F7F7F7',
        'logo': '#F85A5A',
        'navbar-passive': '#6f6f6f',
        'white': '#ffffff',
        'black': '#000',
        'lightgrey': '#bfbfbf',
        'footer': '#262626',
        'footer-link': '#f8f8f8',
        'input': '#e8ebf0'
      },
      scrollBehavior: {
        'smooth': 'smooth',
      },
      borderRadius: {
        'base': '0px',
      }
    },
  },
  plugins: [],
}