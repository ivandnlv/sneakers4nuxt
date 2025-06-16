<script setup lang="ts">
import { sliderApi } from '~/src/shared/api/slider'
import type { SlideDto } from '~/src/shared/api/slider/types'
import SwiperButtons from '~/src/entities/swiper/ui/SwiperButtons.vue'

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

const swiperInstanceRef = ref(null)

const { prev, next } = useSwiper(swiperInstanceRef)
</script>

<template>
  <ClientOnly>
    <div class="relative">
      <swiper-container
        ref="swiperInstanceRef"
        loop
        class="!rounded-[20px] overflow-hidden relative"
      >
        <swiper-slide
          v-for="(item, i) in slidesImages"
          :key="i"
        >
          <img :src="item" :alt="item" class="w-full" draggable="false">
        </swiper-slide>
      </swiper-container>

      <SwiperButtons
        class="z-10 w-[102%]"
        @prev="prev"
        @next="next"
      />
    </div>

    <template #fallback>
      <USkeleton class="w-full rounded-[20px] h-[317px]" />
    </template>
  </ClientOnly>
</template>
