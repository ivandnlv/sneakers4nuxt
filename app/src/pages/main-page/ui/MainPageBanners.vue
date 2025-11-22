<script setup lang="ts">
import BannerListSlider from '~/src/entities/banner/ui/BannerListSlider.vue'
import { useMainPageBannersStore } from '~/src/pages/main-page/model/store/banners'
import SwiperButtons from '~/src/entities/swiper/ui/SwiperButtons.vue'

const { data, pending } = storeToRefs(useMainPageBannersStore())

const bannerListSlider = useTemplateRef('bannerListSlider')
const sliderInstance = computed(() => bannerListSlider.value?.swiperInstanceRef ?? null)

const { prev, next, isBeginning, isEnd } = useSwiper(sliderInstance)
</script>

<template>
  <ClientOnly>
    <USkeleton v-if="pending" class="w-full rounded-[20px] h-[317px]" />

    <BannerListSlider v-else ref="bannerListSlider" :banners="data">
      <template #actions>
        <SwiperButtons
          class="w-[102%] max-lg:hidden"
          :show-prev="!isBeginning"
          :show-next="!isEnd"
          @prev="prev"
          @next="next"
        />
      </template>
    </BannerListSlider>

    <template #fallback>
      <USkeleton class="w-full rounded-[20px] h-[317px]" />
    </template>
  </ClientOnly>
</template>
