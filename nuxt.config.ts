// https://nuxt.com/docs/api/configuration/nuxt-config

// import type {UUID} from "node:crypto";
export default defineNuxtConfig({

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt-alt/http', '@vueuse/nuxt', 'nuxt-swiper'],

  css: ['~/assets/css/main.css'],

  plugins: [
    '~/plugins/http'
  ],

  components: false,

  pages: true,

  ui: {
    colorMode: false,
    theme: {
      colors: ['gray']
    }
  },

  runtimeConfig: {
    public: {
      strapiBase: process.env.NUXT_PUBLIC_STRAPI_BASE
    }
  }
})
