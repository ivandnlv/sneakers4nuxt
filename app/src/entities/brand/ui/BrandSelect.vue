<script setup lang="ts">
import { brandModel } from '~/src/entities/brand'
import type { SelectModelValue } from '~/src/shared/types/ui/select'

defineProps<{
  multiple?: boolean
}>()

const store = brandModel.useBrandsStore()
const { data } = storeToRefs(store)

const model = defineModel<SelectModelValue>()
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
