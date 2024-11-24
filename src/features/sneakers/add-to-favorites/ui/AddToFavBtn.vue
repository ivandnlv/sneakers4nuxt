<script setup lang="ts">
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

const props = defineProps<{
  sneaker: SneakerMinDto
}>()

const isFavorite = ref(props.sneaker?.isFavorite ?? false)

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await sneakersApi.toggleFavorites(props.sneaker.id)

  isFavorite.value = !isFavorite.value
})
</script>

<template>
  <UButton
    size="xl"
    :icon="HeroIcons.HEART_SOLID"
    color="gray"
    :class="{
      'text-red-400': isFavorite,
      'text-gray-300': !isFavorite
    }"
    :loading="isLoading"
    @click="runWithLoading"
  />
</template>
