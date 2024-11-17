<script setup lang="ts">
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { formatRUB } from '~/src/shared/lib/format/number/format-price'

const props = defineProps<{
  sneaker: SneakerMinDto
}>()

const price = computed(() => formatRUB(props.sneaker.price))
const oldPrice = computed(() => props.sneaker.oldPrice ? formatRUB(props.sneaker.oldPrice) : '')
</script>

<template>
  <div class="flex w-[210px] h-[260px] flex-col rounded-2xl border p-3 border-gray-200">
    <slot name="leading-feature" />

    <img class="w-full h-[112px] rounded-lg overflow-hidden object-contain" :src="sneaker.cover" alt="Обложка">
    <span class="mt-4">{{ sneaker.name }}</span>
    <div class="flex justify-between gap-6">
      <div class="flex flex-col">
        <span class="text-gray-400">ЦЕНА: <b v-if="oldPrice" class="sneaker-card__old-price">{{ oldPrice }}</b></span>
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
  </div>
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
