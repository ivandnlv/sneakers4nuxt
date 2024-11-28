<script setup lang="ts">

import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import CartModal from '~/src/widgets/cart/ui/CartModal.vue'

const modal = useModal()

const openCartModal = () => {
  modal.open(CartModal)
}
</script>

<template>
  <UButton
    class="w-6 h-6 hover:text-primary-600"
    color="gray"
    size="xl"
    variant="ghost"
    :icon="HeroIcons.SHOPPING_CART_SOLID"
    @click="openCartModal"
  />
</template>
