<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const resetFilters = async () => {
  await router.replace({
    ...route,
    query: {}
  })
}
</script>

<template>
  <UButton size="xl" color="white" @click="resetFilters">
    Сбросить
  </UButton>
</template>
