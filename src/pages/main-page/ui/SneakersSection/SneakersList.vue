<script setup lang="ts">
import { useSneakersStore } from '~/src/entities/sneaker/model/store/sneakers-store'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import SneakerCardLoader from '~/src/entities/sneaker/ui/SneakerCardLoader.vue'
import AddToFavBtn from '~/src/features/sneakers/add-to-favorites/ui/AddToFavBtn.vue'

const store = useSneakersStore()
const { sneakersData, pending } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-grow gap-4 flex-wrap">
    <template v-if="pending">
      <SneakerCardLoader v-for="i in 9" :key="i" />
    </template>

    <template v-else>
      <SneakerCard
        v-for="(sneaker, i) in sneakersData"
        :key="i"
        class="relative"
        :sneaker="sneaker"
      >
        <template #leading-feature>
          <AddToFavBtn
            class="absolute top-4 left-4"
            :sneaker="sneaker"
          />
        </template>
      </SneakerCard>
    </template>
  </div>
</template>
