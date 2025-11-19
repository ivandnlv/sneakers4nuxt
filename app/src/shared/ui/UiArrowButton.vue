<script setup lang="ts">
import type { ButtonColor, ButtonSize } from '#ui/types'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'

const props = withDefaults(
  defineProps<{
    color?: ButtonColor
      type: 'prev' | 'next'
      size?: ButtonSize
      disabled?: boolean
      direction?: 'horizontal' | 'vertical'
    }>(),
  {
    type: 'prev',
    size: 'lg',
    disabled: false,
    direction: 'horizontal',
    color: 'neutral'
  }
)

const icon = computed(() => {
  if (props.direction === 'horizontal') {
    return props.type === 'prev' ? HeroIcons.ARROW_LEFT : HeroIcons.ARROW_RIGHT
  }

  return props.type === 'prev' ? HeroIcons.ARROW_UP : HeroIcons.ARROW_DOWN
})
</script>

<template>
  <UButton
    class="arrow-button"
    :size="size"
    variant="solid"
    :color="color"
    :icon="icon"
    :disabled="disabled"
    :padded="true"
    :ui="{
      rounded: 'rounded-full'
    }"
  />
</template>

<style scoped lang="scss">
.arrow-button {
  box-shadow: none !important;
}
</style>
