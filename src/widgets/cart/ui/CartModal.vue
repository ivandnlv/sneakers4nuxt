<script setup lang="ts">
import { useCartStore } from '~/src/widgets/cart/model/store/cart-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'

const store = useCartStore()
const { cart } = storeToRefs(store)
</script>

<template>
  <UModal
    :ui="{
      base: 'p-6'
    }"
  >
    <span class="text-xl">Корзина</span>

    <div class="flex flex-col gap-3 mt-6">
      <SneakerCard
        v-for="(sneaker, i) in cart"
        :key="i"
        direction="horizontal"
        :sneaker="sneaker"
      />
    </div>
  </UModal>
</template>
