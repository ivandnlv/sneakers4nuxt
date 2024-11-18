// https://nuxt.com/docs/api/configuration/nuxt-config

// import type {UUID} from "node:crypto";
export default defineNuxtConfig({

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt-alt/http'],

  plugins: [
    '~/plugins/http'
  ],

  components: false,

  pages: true
})
