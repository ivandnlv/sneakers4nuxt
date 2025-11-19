<script setup lang="ts">
import { useFavoritesStore } from '~/src/entities/favorites/model/store/favorites-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'
import RemoveFromFavsBtn from '~/src/features/favorites/remove-from-favorites/ui/RemoveFromFavsBtn.vue'

const store = useFavoritesStore()
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
