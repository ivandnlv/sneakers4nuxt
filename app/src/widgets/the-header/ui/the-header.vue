<script setup lang="ts">
import UiLogo from '~/src/shared/ui/UiLogo.vue'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import type { SitemapRoute } from '~/src/shared/router/sitemap/types'
import { SITEMAP } from '~/src/shared/router/sitemap'
import { OpenCartBtn } from '~/src/widgets/cart'
import { authModel, AuthLogInButton, AuthRegistrationButton, AuthLogoutButton } from '~/src/entities/auth'

const navRoutes: SitemapRoute[] = [
  SITEMAP.main,
  SITEMAP.wishes,
  SITEMAP.myPurchases
]

const authStore = authModel.useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
</script>

<template>
  <UiContainer class="flex items-center w-full justify-between gap-6 flex-wrap pb-8 border-b border-gray-200">
    <UiLogo />

    <nav v-if="isLoggedIn" class="flex gap-6 items-center">
      <nuxt-link
        v-for="(link, i) in navRoutes"
        :key="i"
        class="the-header__link"
        :to="link.route"
      >
        {{ link.name }}
      </nuxt-link>
    </nav>

    <div v-if="isLoggedIn" class="flex gap-4 items-center">
      <OpenCartBtn />
      <AuthLogoutButton />
    </div>

    <div v-else class="flex gap-4">
      <AuthLogInButton />
      <AuthRegistrationButton color="gray" />
    </div>
  </UiContainer>
</template>

<style lang="scss" scoped>
.the-header {
  &__link {
    &.router-link-active {
      color: var(--main-color);
    }
  }
}
</style>
