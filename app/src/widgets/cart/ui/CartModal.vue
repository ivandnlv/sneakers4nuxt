<script setup lang="ts">
import { useCartStore } from '~/src/widgets/cart/model/store/cart-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import Empty from '~/src/shared/ui/Empty.vue'
import RemoveFromCartBtn from '~/src/features/cart/remove-from-cart/ui/RemoveFromCartBtn.vue'
import CreateOrderBtn from '~/src/features/cart/order/ui/CreateOrderBtn.vue'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useOrdersStore } from '~/src/entities/orders/model/store/orders-store'

const store = useCartStore()
const { cart } = storeToRefs(store)

const ordersStore = useOrdersStore()

const onOrdered = (sneakers: SneakerMinDto[]) => {
  store.createOrder()
  ordersStore.setOrders(sneakers)
}
</script>

<template>
  <UModal
    title="Корзина"
    :ui="{
      content: 'p-6'
    }"
  >
    <template #content>
      <span class="text-xl">Корзина</span>

      <div v-if="cart.length" class="flex flex-col">
        <div class="flex flex-col gap-3 mt-6 max-h-[90vh] overflow-y-auto">
          <SneakerCard
            v-for="(sneaker, i) in cart"
            :key="i"
            class="relative"
            direction="horizontal"
            :sneaker="sneaker"
          >
            <template #leading-feature>
              <RemoveFromCartBtn
                color="neutral"
                class="absolute left-6 top-6"
                :sneaker="sneaker"
                @removed="store.removeFromCart"
              />
            </template>
          </SneakerCard>
        </div>

        <CreateOrderBtn
          block
          size="xl"
          :sneakers="cart"
          @ordered="onOrdered"
        />
      </div>

      <Empty v-else class="mt-6 text-center py-12" />
    </template>
  </UModal>
</template>
