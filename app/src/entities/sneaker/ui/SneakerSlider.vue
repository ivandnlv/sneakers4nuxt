<script setup lang="ts">
import type { SneakerDto } from '~/src/shared/api/sneakers/types'

const props = defineProps<{
  sneaker: SneakerDto
}>()

const chosenPhoto = ref(props.sneaker.photos[0])

const onPhotoClick = (image: string) => {
  if (chosenPhoto.value !== image) {
    chosenPhoto.value = image
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <img class="w-full rounded-[20px] overflow-hidden h-[360px]" :src="chosenPhoto" alt="Выбранное фото">

    <swiper-container
      class="!w-full"
      :space-between="12"
      slides-per-view="auto"
    >
      <swiper-slide
        v-for="(item, i) in sneaker.photos"
        :key="i"
        class="!w-fit rounded-xl overflow-hidden border-4 border-transparent hover:border-primary-500 cursor-pointer"
        :class="{
          'border-primary-500': item === chosenPhoto
        }"
      >
        <img
          class=" w-32 h-32  object-cover"
          :src="item"
          :alt="`Изображение-${i + 1}`"
          @click="onPhotoClick(item)"
        >
      </swiper-slide>
    </swiper-container>
  </div>
</template>
