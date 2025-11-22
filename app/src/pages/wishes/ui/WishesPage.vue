<script setup lang="ts">
import { favoritesModel } from '~/src/entities/favorites'
import { SneakerCard } from '~/src/entities/sneaker'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'
import { RemoveFromFavsBtn } from '~/src/features/favorites/remove-from-favorites'

const store = favoritesModel.useFavoritesStore()
const { favorites } = storeToRefs(store)
</script>

<template>
  <div v-if="favorites.length" class="flex gap-6 mt-12">
    <SneakerCard
      v-for="(sneaker, i) in favorites"
      :key="i"
      class="w-[210px] relative"
      :sneaker="sneaker"
    >
      <template #leading-feature>
        <RemoveFromFavsBtn
          color="gray"
          class="absolute"
          :sneaker="sneaker"
          @removed="store.removeFromFavorites"
        />
      </template>
    </SneakerCard>
  </div>

  <UiEmpty v-else class="text-center py-12 mt-12" />
</template>
