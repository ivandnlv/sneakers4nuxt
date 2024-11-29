<script setup lang="ts">
import { useCartStore } from '~/src/widgets/cart/model/store/cart-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import Empty from '~/src/shared/ui/Empty.vue'
import RemoveFromCartBtn from '~/src/features/cart/remove-from-cart/ui/RemoveFromCartBtn.vue'

const store = useCartStore()
const { cart } = storeToRefs(store)
</script>

<template>
  <UModal
    :ui="{
      base: 'p-6 max-h-[90vh] overflow-y-auto'
    }"
  >
    <span class="text-xl">Корзина</span>

    <div v-if="cart.length" class="flex flex-col gap-3 mt-6 ">
      <SneakerCard
        v-for="(sneaker, i) in cart"
        :key="i"
        class="relative"
        direction="horizontal"
        :sneaker="sneaker"
      >
        <template #leading-feature>
          <RemoveFromCartBtn
            color="gray"
            class="absolute left-6 top-6"
            :sneaker="sneaker"
            @removed="store.removeFromCart"
          />
        </template>
      </SneakerCard>
    </div>

    <Empty v-else class="mt-6 text-center py-12" />
  </UModal>
</template>
