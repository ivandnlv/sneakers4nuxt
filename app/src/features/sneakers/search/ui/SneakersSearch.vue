<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const search = ref(route.query?.search ?? '')

const changeRouteBySearch = async () => {
  await router.replace({
    ...route,
    query: {
      ...route.query,
      search: search.value
    }
  })
}

const debouncedChangeRoute = useDebounceFn(changeRouteBySearch, 300)

watch(search, debouncedChangeRoute)
watch(() => route.query, () => {
  search.value = route.query?.search ?? ''
})
</script>

<template>
  <UInput v-model="search" size="xl" placeholder="Поиск..." />
</template>
