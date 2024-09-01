// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    '@vueuse/nuxt',
    "@nuxt/icon",
    'nuxt-swiper',
    '@vueuse/motion/nuxt'
  ],
  tailwindcss: {
    exposeConfig: true,
    cssPath: '~/assets/main.css',
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
})