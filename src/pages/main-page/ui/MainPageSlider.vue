<script setup lang="ts">
import { sliderApi } from '~/src/shared/api/slider'
import type { SlideDto } from '~/src/shared/api/slider/types'

const { data } = useAsyncData('main-page-slides', getSlides, {
  default: () => [] as SlideDto[]
})

const slidesImages = computed(() => {
  return data.value.sort((a, b) => a.sortIndex - b.sortIndex).map(item => item.img)
})

async function getSlides () {
  const { data } = await sliderApi.getMainPageSlides()

  return data
}
</script>

<template>
  <UCarousel
    v-if="slidesImages?.length"
    v-slot="{ item }"
    :items="slidesImages"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden"
    arrows
  >
    <img :src="item" class="w-full" draggable="false">
  </UCarousel>
</template>
