<script setup lang="ts">
import { SneakerCard, SneakerCardLoader } from '~/src/entities/sneaker'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

defineProps<{
  sneakers: SneakerMinDto[]
  pending?: boolean
}>()
</script>

<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-6">
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
