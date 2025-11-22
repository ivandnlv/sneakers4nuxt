<script setup lang="ts">
import { useBrandsStore } from '~/src/entities/brand/model/store/use-brands-store'

defineProps<{
  multiple?: boolean
}>()

const store = useBrandsStore()
const { data } = storeToRefs(store)

const model = defineModel<string | string[] | undefined>()
</script>

<template>
  <USelectMenu
    v-model="model"
    size="xl"
    :items="data"
    value-key="name"
    label-key="name"
    :multiple="multiple"
    placeholder="Бренды"
  />
</template>
