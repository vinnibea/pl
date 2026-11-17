// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, user-scalable=no",
      script: [
        {
          src: "https://code.iconify.design/2/2.2.1/iconify.min.js",
          defer: true,
        },
      ],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@vueuse/motion/nuxt",
    "@nuxt/ui",
    "unplugin-icons/nuxt",
    "nuxt-swiper",
  ],
  //@ts-ignore
  prisma: {
    installStudio: false, // Вимикаємо автоматичний запуск студії
  },

  tailwindcss: {
    exposeConfig: true,
    cssPath: ["~/assets/main.css", { injectPosition: 0 }],
    configPath: "tailwind.config.js",
    config: {},
    // injectPosition: 0,
    viewer: true,
  },

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Montserrat Alternates": true,
    },
    display: "swap",
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
    airwallaxApi: process.env.AIRWALLAX_API,
    airwallaxClient: process.env.AIRWALLAX_CLIENT,
    airwallaxUrl: process.env.AIRWALLAX_URL,
    airwallaxPriceId: process.env.AIRWALLAX_PRICE_ID,
    airwallaxAcc: process.env.AIRWALLAX_ACC,
    returnUrl: process.env.return_url,
    public: {
      stripeKey: process.env.NUXT_PUBLIC_STRIPE_KEY,
      productPrice: process.env.NUXT_PUBLIC_STRIPE_PRICE,
      airwallaxMode: process.env.NUXT_PUBLIC_AIRWALLAX_MODE
    },
  },

  icon: {
    serverBundle: {
      externalizeIconsJson: true,
    },
  },

  nitro: {
    plugins: ["~/server/plugins/index.js"],
  },

  vite: {
    optimizeDeps: {
      include: ["cookie"],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
});
