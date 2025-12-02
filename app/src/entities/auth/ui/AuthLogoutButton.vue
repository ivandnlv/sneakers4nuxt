<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Выйти',
  size: 'xl',
  color: 'gray'
})

const { signOut } = useAuth()

const [isLoading, toggleLoading] = useToggle()

async function logout () {
  toggleLoading(true)

  await signOut()
}
</script>

<template>
  <UButton
    v-bind="props"
    :loading="isLoading"
    @click="logout"
  />
</template>
