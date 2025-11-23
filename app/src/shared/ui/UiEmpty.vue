<script lang="ts" setup>
withDefaults(defineProps<{
  bodyUi?: string
  title?: string
}>(), {
  bodyUi: '',
  title: 'Тут пусто'
})
</script>

<template>
  <UCard
    :ui="{
      body: ['flex flex-col justify-center items-center', bodyUi].join(' ')
    }"
  >
    {{ title }}
  </UCard>
</template>
