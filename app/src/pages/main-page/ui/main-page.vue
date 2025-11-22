<script setup lang="ts">
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import SneakersList from '~/src/pages/main-page/ui/SneakersSection/SneakersList.vue'

import MainPageBanners from '~/src/pages/main-page/ui/MainPageBanners.vue'
import { useSneakersStrapiStore } from '~/src/entities/sneaker/model/store/sneakers-strapi-store'

const store = useSneakersStrapiStore()
const { data, pending } = storeToRefs(store)
</script>

<template>
  <UiContainer class="mt-6">
    <MainPageBanners />

    <h1 class="mt-6 text-xl font-semibold">
      Каталог кроссовок
    </h1>
    <div class="flex gap-6 mt-6">
      <div class="flex w-full flex-col gap-4">
        <SneakersList :sneakers="data" :pending="pending" />
      </div>
    </div>
  </UiContainer>
</template>
