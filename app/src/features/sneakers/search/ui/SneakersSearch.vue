<script setup lang="ts">
import { useSneakersStrapiStore } from '~/src/entities/sneaker/model/store/sneakers-strapi-store'

const { filters } = storeToRefs(useSneakersStrapiStore())

const localSearch = ref<string | undefined>()
const debouncedSearch = debouncedRef(localSearch, 500)

watch(debouncedSearch, () => (filters.value['filters[name][$containsi]'] = localSearch.value))

watch(() => filters.value['filters[name][$containsi]'], () => (localSearch.value = filters.value['filters[name][$containsi]']))
</script>

<template>
  <UInput v-model="localSearch" size="xl" placeholder="Поиск по названию" />
</template>
