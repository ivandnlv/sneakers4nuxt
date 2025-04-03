<script setup lang="ts">

import type { ButtonSize } from '#ui/types'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import type { SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { sneakersApi } from '~/src/shared/api/sneakers'

const props = withDefaults(defineProps<{
  sneaker: SneakerDto | SneakerMinDto
  withIcon?: boolean
  withTitle?: boolean
  size?: ButtonSize
}>(), {
  withIcon: true,
  withTitle: false,
  size: 'xl'
})

const isInCart = ref(props.sneaker?.isInCart)

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await sneakersApi.toggleCart(props.sneaker.id)
  isInCart.value = !isInCart.value
})

const icon = computed(() => {
  if (!props.withIcon) {
    return undefined
  }

  return isInCart.value ? HeroIcons.CHECK : HeroIcons.PLUS
})

const title = computed(() => {
  if (!props.withTitle) {
    return ''
  }

  return isInCart.value ? 'Удалить из корзины' : 'Добавить в корзину'
})
</script>

<template>
  <UButton
    :size="size"
    :color="isInCart ? 'primary' : 'gray'"
    :icon="icon"
    :loading="isLoading"
    @click="runWithLoading"
  >
    <span v-if="title">{{ title }}</span>
  </UButton>
</template>
