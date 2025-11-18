<script setup lang="ts">
import type { SneakerSize } from '~/src/shared/api/sneakers/types'

defineProps<{
  size: SneakerSize
}>()
</script>

<template>
  <button
    class="w-12 h-12 flex flex-col justify-center items-center cursor-pointer hover:border-primary-500 rounded-xl text-xl border border-gray-200"
    :class="{
      'select-none bg-gray-200 hover:border-gray-200': !size.isAvailable
    }"
  >
    {{ size.number }}
  </button>
</template>
