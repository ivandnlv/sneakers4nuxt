<script setup lang="ts">
import { authModel, AuthLogInButton, AuthLogoutButton, AuthRegistrationButton } from '~/src/entities/auth'
import { OpenCartBtn } from '~/src/widgets/cart'
import type { SitemapRoute } from '~/src/shared/router/sitemap/types'
import { SITEMAP } from '~/src/shared/router/sitemap'

const authStore = authModel.useAuthStore()

const navRoutes: SitemapRoute[] = [
  SITEMAP.main,
  SITEMAP.wishes,
  SITEMAP.myPurchases
]
</script>

<template>
  <div class="flex w-full justify-between">
    <nav v-if="authStore.isLoggedIn" class="flex lg:absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 gap-6 items-center">
      <nuxt-link
        v-for="(link, i) in navRoutes"
        :key="i"
        class="the-header__link"
        :to="link.route"
      >
        {{ link.name }}
      </nuxt-link>
    </nav>

    <div v-if="authStore.isLoggedIn" class="flex gap-4 lg:ml-auto items-center">
      <OpenCartBtn />
      <AuthLogoutButton />
    </div>

    <div v-else class="flex gap-4 ml-auto">
      <AuthLogInButton />
      <AuthRegistrationButton color="gray" />
    </div>
  </div>
</template>
