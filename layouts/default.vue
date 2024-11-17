<script setup lang="ts">
import TheHeader from '~/src/widgets/the-header/ui/the-header.vue'
import Container from '~/src/shared/ui/Container.vue'
</script>

<template>
  <Container class="flex flex-col bg-white rounded-[20px] p-8 ">
    <TheHeader />

    <slot />
  </Container>
</template>
