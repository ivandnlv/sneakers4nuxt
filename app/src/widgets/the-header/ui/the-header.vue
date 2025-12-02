<script setup lang="ts">
import TheHeaderClientActions from './the-header-client-actions.vue'
import UiLogo from '~/src/shared/ui/UiLogo.vue'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
</script>

<template>
  <UiContainer class="flex items-center lg:!relative w-full justify-between gap-6 max-lg:flex-wrap">
    <UiLogo />

    <ClientOnly>
      <TheHeaderClientActions />

      <template #fallback>
        <div class="flex w-full justify-between">
          <div class="flex gap-6 items-center">
            <USkeleton v-for="i in 3" :key="`skeleton-1-${i}`" class="w-[100px] h-6" />
          </div>

          <div class="flex gap-4 items-center">
            <USkeleton class="h-11 w-[78px]" />
            <USkeleton class="h-11 w-[78px]" />
          </div>
        </div>
      </template>
    </ClientOnly>
  </UiContainer>
</template>

<style lang="scss" scoped>
.the-header {
  &__link {
    &.router-link-active {
      color: var(--main-color);
    }
  }
}
</style>
