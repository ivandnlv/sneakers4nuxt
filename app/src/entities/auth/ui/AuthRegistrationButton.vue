<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'xl',
  label: 'Зарегистрироваться'
})

const overlay = useOverlay()
const registrationModal = overlay.create(defineAsyncComponent(() => import('./AuthRegistrationModal.vue')))
</script>

<template>
  <UButton
    v-bind="props"
    @click="registrationModal.open()"
  />
</template>
