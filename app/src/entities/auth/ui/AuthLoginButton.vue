<script lang="ts" setup>
import type { ButtonProps } from '#ui/types'
import { useAuthStore } from '~/src/entities/auth/model/store/use-auth-store'

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'xl',
  label: 'Войти'
})

const store = useAuthStore()
</script>

<template>
  <UButton
    v-bind="props"
    @click="store.openAuthModal()"
  />
</template>
