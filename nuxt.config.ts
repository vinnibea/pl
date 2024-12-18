// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
    }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    '@vueuse/nuxt',
    "@nuxt/icon",
    '@vueuse/motion/nuxt',
    '@nuxt/ui',
    'unplugin-icons/nuxt',
    "@prisma/nuxt",
    "nuxt-swiper",
  ],

  tailwindcss: {
    exposeConfig: true,
    cssPath: ["~/assets/main.css", { injectPosition: 0 }],
    configPath: 'tailwind.config.js',
    config: {},
    injectPosition: 0,
    viewer: true,
  },

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      Montserrat: '100...900',
      "Montserrat Alternates": true,
    },
    display: 'swap',
  },

  runtimeConfig: {
    mongoUrl: process.env.MONGO_DB_URI,
    secret: process.env.SECRET,
    bot: process.env.BOT,
    SSK: process.env.SSK,
    email: process.env.EMAIL,
    tsid: process.env.TSID,
    ttoken: process.env.TTOKEN,
    key: process.env.KEY,
    price: process.env.price,
    api: process.env.API_KEY,
    public: {
      stripeKey: ''
    }
  },

  icon: {
    serverBundle: {
      externalizeIconsJson: true,
    }
  },
 
  nitro: {
    plugins: ["~/server/plugins/index.js"],
  },

  vite: {
    resolve: {
       alias: {
         ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  }
})