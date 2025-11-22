<script setup lang="ts">
import { sneakerModel } from '~/src/entities/sneaker'
const { filters } = storeToRefs(sneakerModel.useSneakersStrapiStore())

const localSearch = ref<string | undefined>()
const debouncedSearch = debouncedRef(localSearch, 500)

watch(debouncedSearch, () => (filters.value.search = localSearch.value))

watch(() => filters.value.search, () => (localSearch.value = filters.value.search))
</script>

<template>
  <UInput v-model="localSearch" size="xl" placeholder="Поиск по названию" />
</template>
