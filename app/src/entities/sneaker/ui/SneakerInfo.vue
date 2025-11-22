<script setup lang="ts">
import { formatRUB } from '~/src/shared/lib/format/number/format-price'
import type { SneakerDto } from '~/src/shared/api/sneakers/types'
import { SneakerSize } from '~/src/entities/sneaker'

withDefaults(defineProps<{
  sneaker: SneakerDto,
  alignItems?: 'center' | 'start' | 'end'
}>(), {
  alignItems: 'end'
})
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <div
      class="w-full flex flex-col"
      :class="{
        [`items-${alignItems}`]: true
      }"
    >
      <span class="font-medium">{{ sneaker.name }}</span>

      <p class="mt-6 text-right">
        {{ sneaker.description }}
      </p>
    </div>

    <div
      class="w-full flex flex-col"
      :class="{
        [`items-${alignItems}`]: true
      }"
    >
      <span class="font-medium mt-6">Доступные размеры</span>
      <div class="flex mt-3 gap-2">
        <SneakerSize v-for="(item, i) in sneaker.sizes" :key="i" :size="item" />
      </div>
      <div class="flex w-full mt-6 text-xl justify-between items-center">
        <span>Цена:</span>
        <span>{{ formatRUB(sneaker.price) }}</span>
      </div>

      <slot name="feature" />
    </div>
  </div>
</template>
