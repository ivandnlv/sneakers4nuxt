<script setup lang="ts">
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { cartApi } from '~/src/shared/api/cart'

const props = defineProps<{
  sneaker: SneakerMinDto
}>()

const emit = defineEmits<{
  (e: 'removed', sneaker: SneakerMinDto): void
}>()

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await cartApi.deleteFromCart(props.sneaker.id)
  emit('removed', props.sneaker)
})
</script>

<template>
  <UButton
    :icon="HeroIcons.X_MARK_16_SOLID"
    :loading="isLoading"
    @click="runWithLoading"
  />
</template>
