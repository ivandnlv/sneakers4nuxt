<template>
  <div class="flex flex-col w-full mt-6">
    <div class="flex gap-3 items-center">
      <UButton
        color="gray"
        size="xl"
        :icon="HeroIcons.ARROW_SMALL_LEFT"
        @click="$router.back()"
      />

      <USkeleton class="h-9 w-[40%]" />
    </div>

    <div class="grid grid-cols-2 gap-8 mt-4 p-5">
      <div class="flex flex-col gap-6 w-full">
        <USkeleton class="w-full h-[360px]" />

        <div class="flex gap-3">
          <USkeleton v-for="i in 3" :key="i" class="w-[128px] h-[128px]" />
        </div>
      </div>

      <div class="flex flex-col items-end">
        <USkeleton class="w-[60%] h-6" />

        <USkeleton class="w-[80%] mt-6 h-[168px]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'
</script>
