<script setup lang="ts">
import { TheHeader } from '~/src/widgets/the-header'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import { AuthLogInButton } from '~/src/entities/auth'
</script>

<template>
  <UiContainer class="layout-container flex flex-col bg-white p-8 ">
    <TheHeader>
      <template #actions>
        <div class="flex gap-4 ml-auto">
          <AuthLogInButton />
        </div>
      </template>
    </TheHeader>

    <slot />
  </UiContainer>
</template>

<style lang="scss" scoped>
.layout-container {
  border-radius: 20px 20px 0 0;
  min-height: calc(100dvh - 90px);

  @media (max-width: 1024px) {
    min-height: 100svh;
    border-radius: 0;
  }
}
</style>
