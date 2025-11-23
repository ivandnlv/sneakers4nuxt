<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

type Props = ButtonProps & {
  isLastPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'xl',
  color: 'gray',
  label: 'Загрузить еще'
})

const isShow = ref(!props.isLastPage)

watch(() => props.isLastPage, (newVal) => {
  useTimeoutFn(() => (isShow.value = !newVal), 500)
})
</script>

<template>
  <UButton v-if="isShow" v-bind="props" />
</template>
