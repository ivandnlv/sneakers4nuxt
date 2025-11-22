<script setup lang="ts">
import { cartModel } from '~/src/widgets/cart'
import { SneakerCard } from '~/src/entities/sneaker'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'
import { RemoveFromCartBtn } from '~/src/features/cart/remove-from-cart'
import { CreateOrderBtn } from '~/src/features/cart/order'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { ordersModel } from '~/src/entities/orders'

const store = cartModel.useCartStore()
const { cart } = storeToRefs(store)

const ordersStore = ordersModel.useOrdersStore()

const onOrdered = (sneakers: SneakerMinDto[]) => {
  store.createOrder()
  ordersStore.setOrders(sneakers)
}
</script>

<template>
  <UModal
    title="Корзина"
    :ui="{
      content: 'p-6 divide-none flex flex-col gap-6'
    }"
  >
    <template #content>
      <span class="text-xl">Корзина</span>

      <template v-if="cart.length">
        <div class="flex flex-col gap-3 max-h-[90vh] overflow-y-auto">
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
                variant="ghost"
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
      </template>

      <UiEmpty v-else class="mt-6 text-center py-12" />
    </template>
  </UModal>
</template>
