<script setup lang="ts">
import { useSneakersStore } from '~/src/pages/main-page/model/store/sneakers-store'
import Container from '~/src/shared/ui/Container.vue'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import SneakerCardLoader from '~/src/entities/sneaker/ui/SneakerCardLoader.vue'

const store = useSneakersStore()
const { sneakersData, pending } = storeToRefs(store)
</script>

<template>
  <Container>
    <span class="text-xl font-semibold">Все кроссовки</span>

    <div class="flex gap-4 mt-4 flex-wrap">
      <template v-if="pending">
        <SneakerCardLoader v-for="i in 9" :key="i" />
      </template>

      <template v-else>
        <SneakerCard
          v-for="(sneaker, i) in sneakersData"
          :key="i"
          :sneaker="sneaker"
        />
      </template>
    </div>
  </Container>
</template>
