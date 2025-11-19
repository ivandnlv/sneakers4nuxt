<script setup lang="ts">
import { formatRUB } from '~/src/shared/lib/format/number/format-price'
import { useOrdersStore } from '~/src/entities/orders/model/store/orders-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'

const store = useOrdersStore()
</script>

<template>
  <div v-if="store.orders.length" class="flex mt-12 flex-col">
    <div class="flex gap-6">
      <SneakerCard
        v-for="(item, i) in store.orders"
        :key="i"
        class="w-[210px]"
        :sneaker="item"
      />
    </div>

    <div class="flex w-full mt-6 justify-between">
      <span>Итого потрачено:</span>
      <div class="border-b border-dotted border-gray-600 h-6 flex-grow" />
      <span>{{ formatRUB(store.finalPrice) }}</span>
    </div>
  </div>

  <UiEmpty v-else class="mt-12 py-12 text-center" />
</template>
