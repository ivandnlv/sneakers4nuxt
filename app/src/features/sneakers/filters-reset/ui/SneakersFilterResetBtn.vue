<script setup lang="ts">
import { sneakerModel } from '~/src/entities/sneaker'

const { filters } = storeToRefs(sneakerModel.useSneakersStrapiStore())

const isFiltersClear = computed(() => {
  for (const _key in filters.value) {
    const currentValue = filters.value[_key as keyof typeof filters.value]

    if ((Array.isArray(currentValue) && currentValue.length > 0) || (!Array.isArray(currentValue) && !!currentValue)) { return false }
  }

  return true
})

const onResetFilters = () => {
  filters.value['filters[name][$containsi]'] = undefined
  filters.value['filters[brand][name][$eqi]'] = undefined
}
</script>

<template>
  <UButton size="xl" color="gray" :disabled="isFiltersClear" @click="onResetFilters">
    Сбросить
  </UButton>
</template>
