<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { useAuthStore } from '../model/store/use-auth-store'
import { strapiAuthApi } from '~/src/shared/strapi/auth'

const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Выйти',
  size: 'xl',
  color: 'gray'
})

const store = useAuthStore()

const [isLoading, toggleLoading] = useToggle()

async function logout () {
  toggleLoading(true)

  try {
    await strapiAuthApi.logout()
  } finally {
    store.resetUserData()
    toggleLoading(false)
  }
}
</script>

<template>
  <UButton
    v-bind="props"
    :loading="isLoading"
    @click="logout"
  />
</template>
