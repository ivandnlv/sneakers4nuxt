<script setup lang="ts">

import { AppRoutes } from '~/src/shared/router/types'
</script>

<template>
  <nuxt-link class="w-[252px] min-w-[252px] block h-[42px] min-h-[42px]" :to="{ name: AppRoutes.index }">
    <img class="w-full h-full" src="/image/logo.svg" alt="Логотип">
  </nuxt-link>
</template>
