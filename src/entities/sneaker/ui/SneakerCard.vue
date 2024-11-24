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
  <UCard class="flex w-[210px]  flex-col">
    <slot name="leading-feature" />

    <img class="w-full h-[112px] rounded-lg overflow-hidden object-contain" :src="sneaker.cover" alt="Обложка">
    <span class="sneaker-card__name my-4">{{ sneaker.name }}</span>
    <div class="flex justify-between gap-6">
      <div class="flex flex-col">
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
@use '/app/styles/includes/mixins' as mixins;

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

  &__name {
    @include mixins.multiline-truncate(3);
  }
}
</style>
