<script setup lang="ts">
import type { SwiperContainer } from 'swiper/element'
import BannerEntity from './BannerEntity.vue'
import type { StrapiBannerEntity } from '~/src/shared/strapi/banners/types'

defineProps<{
  banners: StrapiBannerEntity[]
}>()

const swiperInstanceRef = ref<SwiperContainer | null>(null)

const isLg = useMediaQuery('(max-width: 1024px)')

defineExpose({
  swiperInstanceRef
})
</script>

<template>
  <div class="relative select-none">
    <swiper-container
      ref="swiperInstanceRef"
      class="z-5"
      :allow-touch-move="isLg"
      loop
    >
      <swiper-slide
        v-for="item in banners"
        :key="item.documentId"
      >
        <BannerEntity :banner="item" />
      </swiper-slide>
    </swiper-container>

    <slot name="actions" />
  </div>
</template>
