// https://nuxt.com/docs/api/configuration/nuxt-config

// import type {UUID} from "node:crypto";
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt-alt/http',
    '@vueuse/nuxt',
    'nuxt-swiper',
    '@sidebase/nuxt-auth'
  ],

  css: ['~/assets/css/main.css'],

  plugins: [
    '~/plugins/http'
  ],

  components: false,

  pages: true,

  ui: {
    colorMode: false,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'gray', 'white']
    }
  },

  runtimeConfig: {
    public: {
      strapiBase: process.env.NUXT_PUBLIC_STRAPI_BASE
    }
  },

  auth: {
    originEnvKey: 'NUXT_PUBLIC_STRAPI_BASE',
    disableServerSideAuth: true,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/api/auth/local', method: 'post' },
        signOut: { path: '/api/auth/logout', method: 'post' },
        signUp: { path: '/api/auth/local/register', method: 'post' },
        getSession: { path: '/api/users/me', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/jwt' // access после signIn
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/api/auth/refresh', method: 'post' },
        token: {
          signInResponseRefreshTokenPointer: '/refreshToken',
          refreshResponseTokenPointer: '/jwt',
          refreshRequestTokenPointer: '/refreshToken',
          cookieName: 'auth.refreshToken',
          maxAgeInSeconds: 1800,
          sameSiteAttribute: 'lax',
          secureCookieAttribute: false,
          httpOnlyCookieAttribute: false
        }
      }
    }
  }
})
