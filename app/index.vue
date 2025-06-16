<script setup lang="ts">
import './styles/index.scss'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <client-only>
      <UModals />
    </client-only>
  </NuxtLayout>
</template>
