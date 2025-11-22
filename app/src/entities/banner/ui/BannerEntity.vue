<script setup lang="ts">
import type { StrapiBannerEntity } from '~/src/shared/strapi/banners/types'
import { transformStrapiUploadToProxy } from '~/src/shared/helpers'
import { SITEMAP } from '~/src/shared/router/sitemap'
import { NuxtLink } from '#components'

const props = defineProps<{
  banner: StrapiBannerEntity
}>()

const mainImageSrc = computed(() => transformStrapiUploadToProxy(props.banner.image.url))
const mobileImageSrc = computed(() => {
  if (!props.banner?.mobileImage) { return '' }

  return transformStrapiUploadToProxy(props.banner.mobileImage.url)
})

const sneakerRoute = computed(() => {
  if (!props.banner?.sneaker) { return null }

  return {
    ...SITEMAP.sneakerDetail.route,
    params: {
      id: props.banner.sneaker.documentId
    }
  }
})
</script>

<template>
  <component
    :is="sneakerRoute ? NuxtLink : 'div'"
    :to="sneakerRoute"
    class="flex flex-col rounded-[20px] overflow-hidden"
    :class="{
      'cursor-pointer': !!sneakerRoute
    }"
  >
    <img
      loading="lazy"
      :src="mainImageSrc"
      :alt="banner.name"
      class="w-full"
      :class="{
        'max-lg:hidden': !!mobileImageSrc
      }"
      draggable="false"
    >

    <img
      v-if="mobileImageSrc"
      loading="lazy"
      :src="mobileImageSrc"
      :alt="banner.name"
      class="w-full lg:hidden"
      draggable="false"
    >
  </component>
</template>
