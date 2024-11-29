<script setup lang="ts">

import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import CartModal from '~/src/widgets/cart/ui/CartModal.vue'
import { useCartStore } from '~/src/widgets/cart/model/store/cart-store'

const modal = useModal()

const store = useCartStore()

const cartCounts = computed(() => {
  if (!store.cart.length) {
    return ''
  }

  return store.cart.length < 9 ? store.cart.length.toString() : '9+'
})

const openCartModal = () => {
  modal.open(CartModal)
}
</script>

<template>
  <div class="relative">
    <span v-if="cartCounts" class="absolute -right-6 -bottom-1 bg-primary-600 text-white z-10 w-5 h-5 flex flex-col justify-center items-center rounded-full text-xs">{{ cartCounts }}</span>

    <UButton
      class="w-6 h-6 hover:text-primary-600"
      color="gray"
      size="xl"
      variant="ghost"
      :icon="HeroIcons.SHOPPING_CART_SOLID"
      @click="openCartModal"
    />
  </div>
</template>
