<script setup lang="ts">
import type { SneakerSize } from '~/src/shared/api/sneakers/types'

defineProps<{
  size: SneakerSize
}>()
</script>

<template>
  <div
    class="cursor-pointer hover:border-primary-500 rounded-xl p-3 text-xl border border-gray-200"
    :class="{
      'select-none opacity-50': !size.isAvailable
    }"
  >
    {{ size.number }}
  </div>
</template>
