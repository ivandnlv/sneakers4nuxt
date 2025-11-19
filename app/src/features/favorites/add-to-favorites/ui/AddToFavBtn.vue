<script setup lang="ts">
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { favoritesApi } from '~/src/shared/api/favorites'

const props = defineProps<{
  initialValue?: boolean
  sneaker: SneakerMinDto | SneakerDto
}>()

const emit = defineEmits<{
  (e: 'added', sneaker: SneakerMinDto): void
  (e: 'removed', sneaker: SneakerMinDto): void
}>()

const isFavorite = ref(props?.initialValue ?? false)

watch(() => props.initialValue, () => {
  isFavorite.value = props.initialValue
})

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await favoritesApi.toggleFavorites(props.sneaker.id)

  if (isFavorite.value) {
    emit('removed', props.sneaker)
  } else {
    emit('added', props.sneaker)
  }

  isFavorite.value = !isFavorite.value
})
</script>

<template>
  <UButton
    size="xl"
    :icon="HeroIcons.HEART_SOLID"
    color="gray"
    variant="ghost"
    class="transition-colors"
    :class="{
      'text-red-400': isFavorite,
      'text-gray-300 hover:text-red-400': !isFavorite
    }"
    :loading="isLoading"
    @click="runWithLoading"
  />
</template>
