<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import UiArrowButton from '~/src/shared/ui/UiArrowButton.vue'

withDefaults(
  defineProps<{
      size?: ButtonProps['size']
      direction?: 'horizontal' | 'vertical'
      inContainer?: boolean
      showPrev?: boolean
    showNext?: boolean
    }>(),
  {
    size: 'xs',
    direction: 'horizontal',
    inContainer: true,
    showPrev: true,
    showNext: true
  }
)

const emit = defineEmits<{
  (e: 'prev' | 'next'): void
}>()
</script>

<template>
  <div
    v-if="inContainer"
    class="flex z-50 justify-between absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]"
    :class="{
      'flex-col': direction === 'vertical'
    }"
  >
    <ui-arrow-button
      :direction="direction"
      :class="{
        'opacity-0': !showPrev,
        'opacity-100': showPrev
      }"
      type="prev"
      :size="size"
      @click="emit('prev')"
    />
    <ui-arrow-button
      :direction="direction"
      :class="{
        'opacity-0': !showNext,
        'opacity-100': showNext
      }"
      type="next"
      :size="size"
      @click="emit('next')"
    />
  </div>
  <template v-else>
    <ui-arrow-button
      class="absolute -top-3.5 left-[50%] -translate-x-[50%] z-50"
      :direction="direction"
      :class="{
        'opacity-0': !showPrev,
        'opacity-1': showPrev
      }"
      type="prev"
      :size="size"
      @click="emit('prev')"
    />
    <ui-arrow-button
      class="absolute -bottom-3.5 left-[50%] -translate-x-[50%] z-50"
      :direction="direction"
      :class="{
        'opacity-0': !showNext,
        'opacity-1': showNext
      }"
      type="next"
      :size="size"
      @click="emit('next')"
    />
  </template>
</template>
