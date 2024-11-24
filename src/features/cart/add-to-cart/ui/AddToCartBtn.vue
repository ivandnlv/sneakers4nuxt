<script setup lang="ts">

import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import type { SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { sneakersApi } from '~/src/shared/api/sneakers'

const props = defineProps<{
  sneaker: SneakerDto | SneakerMinDto
}>()

const isInCart = ref(props.sneaker?.isInCart)

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await sneakersApi.toggleCart(props.sneaker.id)
  isInCart.value = !isInCart.value
})
</script>

<template>
  <UButton
    size="xl"
    :color="isInCart ? 'primary' : 'gray'"
    :icon="isInCart ? HeroIcons.CHECK : HeroIcons.PLUS"
    :loading="isLoading"
    @click="runWithLoading"
  />
</template>
