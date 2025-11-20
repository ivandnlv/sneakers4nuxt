<script setup lang="ts">
import { useSneakersStore } from '~/src/entities/sneaker/model/store/sneakers-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import SneakerCardLoader from '~/src/entities/sneaker/ui/SneakerCardLoader.vue'
import AddToFavBtn from '~/src/features/favorites/add-to-favorites/ui/AddToFavBtn.vue'
import AddToCartBtn from '~/src/features/cart/add-to-cart/ui/AddToCartBtn.vue'
import { useCartStore } from '~/src/widgets/cart/model/store/cart-store'
import { useFavoritesStore } from '~/src/entities/favorites/model/store/favorites-store'

const store = useSneakersStore()
const { sneakersData, pending } = storeToRefs(store)
const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="grid md:grid-cols-3 w-full lg:grid-cols-4 gap-6">
    <template v-if="pending">
      <SneakerCardLoader v-for="i in 8" :key="i" />
    </template>

    <template v-else>
      <SneakerCard
        v-for="(sneaker, i) in sneakersData"
        :key="i"
        class="relative w-full"
        :sneaker="sneaker"
      >
        <template #leading-feature>
          <AddToFavBtn
            class="absolute top-4 left-4"
            :sneaker="sneaker"
            :initial-value="!!favoritesStore.favorites.find(item => item.id === sneaker.id)"
            @added="favoritesStore.addToFavorites"
            @removed="favoritesStore.removeFromFavorites"
          />
        </template>

        <template #trailing-feature>
          <AddToCartBtn
            class="self-start"
            :sneaker="sneaker"
            :initial-value="!!cart.find(item => item.id === sneaker.id)"
            @added="cartStore.addToCart"
            @removed="cartStore.removeFromCart"
          />
        </template>
      </SneakerCard>
    </template>
  </div>
</template>
