<script setup lang="ts">
import MainPageBanners from './MainPageBanners.vue'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import { SneakerList } from '~/src/widgets/sneaker-list'
import { strapiSneakersApi } from '~/src/shared/strapi/sneakers'
</script>

<template>
  <UiContainer class="mt-6">
    <MainPageBanners />

    <h1 class="mt-6 text-xl font-semibold">
      Каталог кроссовок
    </h1>

    <SneakerList
      :fetch-list-function="strapiSneakersApi.getList"
      unique-id="main-page-sneakers-list"
      class="mt-6"
      :limit="9"
    />
  </UiContainer>
</template>
