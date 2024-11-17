<script setup lang="ts">
import { useSneakersStore } from '~/src/pages/main-page/model/store/sneakers-store'
import Container from '~/src/shared/ui/Container.vue'
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'

const store = useSneakersStore()
const { sneakersData } = storeToRefs(store)
</script>

<template>
  <Container>
    <span class="text-xl font-semibold">Все кроссовки</span>

    <div class="flex gap-4 mt-4 flex-wrap">
      <SneakerCard
        v-for="(sneaker, i) in sneakersData"
        :key="i"
        :sneaker="sneaker"
      />
    </div>
  </Container>
</template>
