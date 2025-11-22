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
    color: 'gray'
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
    class="arrow-button rounded-full size-8 !p-0 justify-center items-center"
    :size="size"
    :color="color"
    :icon="icon"
    :disabled="disabled"
  />
</template>

<style scoped lang="scss">
.arrow-button {
  box-shadow: none !important;
}
</style>
