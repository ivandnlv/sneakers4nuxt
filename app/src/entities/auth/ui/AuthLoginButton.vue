<script lang="ts" setup>
import { useAuthStore } from '~/src/entities/auth/model/store/use-auth-store'

const store = useAuthStore()
</script>

<template>
  <UButton
    size="xl"
    @click="store.openAuthModal()"
  >
    Войти
  </UButton>
</template>
