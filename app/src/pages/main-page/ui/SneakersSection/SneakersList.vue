<script setup lang="ts">
import SneakerCard from '~/src/entities/sneaker/ui/SneakerCard.vue'
import SneakerCardLoader from '~/src/entities/sneaker/ui/SneakerCardLoader.vue'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

defineProps<{
  sneakers: SneakerMinDto[]
  pending?: boolean
}>()
</script>

<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-6">
    <template v-if="pending">
      <SneakerCardLoader v-for="i in 8" :key="`skeleton-${i}`" />
    </template>

    <template v-else>
      <SneakerCard
        v-for="(sneaker, i) in sneakers"
        :key="`sneaker-${i}`"
        class="relative w-full"
        :sneaker="sneaker"
      />
    </template>
  </div>
</template>
