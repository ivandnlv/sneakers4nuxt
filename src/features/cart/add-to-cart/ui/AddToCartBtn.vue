<script setup lang="ts">

import type { ButtonSize } from '#ui/types'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
import type { SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useTryCatchWithLoading } from '~/src/shared/lib/composables/use-try-catch-with-loading'
import { sneakersApi } from '~/src/shared/api/sneakers'
import { cartApi } from '~/src/shared/api/cart'

const props = withDefaults(defineProps<{
  sneaker: SneakerDto | SneakerMinDto
  initialValue?: boolean
  withIcon?: boolean
  withTitle?: boolean
  size?: ButtonSize
}>(), {
  withIcon: true,
  withTitle: false,
  size: 'xl'
})

const isInCart = ref(props?.initialValue ?? props.sneaker?.isInCart)

watch(() => props.initialValue, () => {
  isInCart.value = props.initialValue
})

const emit = defineEmits<{
  (e: 'added', sneaker: SneakerMinDto): void
  (e: 'removed', sneaker: SneakerMinDto): void
}>()

const { runWithLoading, isLoading } = useTryCatchWithLoading(async () => {
  await cartApi.toggleCart(props.sneaker.id)

  if (isInCart.value) {
    emit('removed', props.sneaker)
  } else {
    emit('added', props.sneaker)
  }

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
