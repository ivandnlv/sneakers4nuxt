<script setup lang="ts">

import Logo from '~/src/shared/ui/Logo.vue'
import Container from '~/src/shared/ui/Container.vue'
import type { SitemapRoute } from '~/src/shared/router/sitemap/types'
import { SITEMAP } from '~/src/shared/router/sitemap'
import OpenCartBtn from '~/src/widgets/cart/ui/OpenCartBtn.vue'

const navRoutes: SitemapRoute[] = [
  SITEMAP.main,
  SITEMAP.wishes,
  SITEMAP.myPurchases
]
</script>

<template>
  <Container class="flex gap-6 items-center w-full justify-between gap-6 flex-wrap pb-8 border-b border-gray-200">
    <Logo />

    <!--    <slot name="actions" />-->

    <nav class="flex gap-6 items-center">
      <nuxt-link
        v-for="(link, i) in navRoutes"
        :key="i"
        class="the-header__link"
        :to="link.route"
      >
        {{ link.name }}
      </nuxt-link>
    </nav>

    <OpenCartBtn />
  </Container>
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
