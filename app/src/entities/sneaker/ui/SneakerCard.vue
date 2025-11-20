<script setup lang="ts">
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { formatRUB } from '~/src/shared/lib/format/number/format-price'
import { SITEMAP } from '~/src/shared/router/sitemap'

const props = withDefaults(defineProps<{
  sneaker: SneakerMinDto
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'vertical'
})

const price = computed(() => formatRUB(props.sneaker.price))
const oldPrice = computed(() => props.sneaker.oldPrice ? formatRUB(props.sneaker.oldPrice) : '')

const isVertical = computed(() => props.direction === 'vertical')
const isHorizontal = computed(() => props.direction === 'horizontal')

const bodyClasses = computed(() => {
  const classes = ['flex']

  if (isHorizontal.value) {
    classes.push('flex-row', 'items-center', 'gap-3')
  }

  if (isVertical.value) {
    classes.push('flex-col')
  }

  return classes.join(' ')
})

const detailRoute = computed(() => ({
  ...SITEMAP.sneakerDetail.route,
  params: {
    id: props.sneaker.id
  }
}))
</script>

<template>
  <UCard
    :ui="{
      body: bodyClasses
    }"
  >
    <slot name="leading-feature" />

    <img class="w-full h-[112px] rounded-lg overflow-hidden object-contain" :src="sneaker.cover" alt="Обложка">

    <NuxtLink
      class="sneaker-card__name multiline-truncate-2 my-4 hover:text-primary-500"
      :to="detailRoute"
    >
      {{ sneaker.name }}
    </NuxtLink>
    <div class="flex justify-between gap-6">
      <div
        class="flex flex-col"
        :class="{
          'items-center': isHorizontal
        }"
      >
        <span class="flex gap-2 items-center text-gray-400">ЦЕНА: <b v-if="oldPrice" class="sneaker-card__old-price text-xs">{{ oldPrice }}</b></span>
        <span
          class="font-semibold"
          :class="{
            'text-primary-500': !!oldPrice
          }"
        >
          {{ price }}
        </span>
      </div>

      <slot name="trailing-feature" />
    </div>
  </UCard>
</template>

<style lang="scss" scoped>
.sneaker-card {
  &__old-price {
    position: relative;

    &::after {
      content: '';
      background: currentColor;
      height: 1px;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(10deg);
    }
  }
}
</style>
