<script setup lang="ts">
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { cartApi } from '~/src/shared/api/cart'

const props = defineProps<{
  sneakers: SneakerMinDto[]
}>()

const emit = defineEmits<{
  (e: 'ordered', value: SneakerMinDto[]): void
}>()

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await cartApi.createOrder({
    sneakerIds: props.sneakers.map(item => item.id)
  })

  emit('ordered', props.sneakers)
})
</script>

<template>
  <UButton
    :loading="isLoading"
    @click="runWithLoading"
  >
    Оформить заказ
  </UButton>
</template>
