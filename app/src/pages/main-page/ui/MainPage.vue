<script setup lang="ts">
import MainPageBanners from './MainPageBanners.vue'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import { SneakerList } from '~/src/widgets/sneaker-list'
</script>

<template>
  <UiContainer class="mt-6">
    <MainPageBanners />

    <h1 class="mt-6 text-xl font-semibold">
      Каталог кроссовок
    </h1>

    <SneakerList class="mt-6" />
  </UiContainer>
</template>
