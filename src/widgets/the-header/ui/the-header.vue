<script setup lang="ts">

import Logo from '~/src/shared/ui/Logo.vue'
import Container from '~/src/shared/ui/Container.vue'
</script>

<template>
  <Container class="flex w-full">
    <Logo />

    <slot name="actions" />
  </Container>
</template>
