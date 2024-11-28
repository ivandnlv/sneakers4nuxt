<script setup lang="ts">
import type { ButtonSize } from '#ui/types'
import ArrowButton from '~/src/shared/ui/ArrowButton.vue'

withDefaults(
  defineProps<{
      size?: ButtonSize
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
  (e: 'prev'): void,
  (e: 'next'): void
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
    <arrow-button
      :direction="direction"
      :class="{
        'opacity-0': !showPrev,
        'opacity-1': showPrev
      }"
      type="prev"
      :size="size"
      @click="emit('prev')"
    />
    <arrow-button
      :direction="direction"
      :class="{
        'opacity-0': !showNext,
        'opacity-1': showNext
      }"
      type="next"
      :size="size"
      @click="emit('next')"
    />
  </div>
  <template v-else>
    <arrow-button
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
    <arrow-button
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
