<script setup lang="ts">
import { useBrandsStore } from '~/src/entities/brand/model/store/use-brands-store'
import type { SelectValue } from '~/src/shared/ui/select/types'

const props = defineProps<{
  modelValue: SelectValue
  multiple?: boolean
}>()

const store = useBrandsStore()

const emit = defineEmits<{
  (e: 'update:model-value', value: SelectValue): void
}>()

const model = computed({
  get () {
    return props.modelValue
  },
  set (value: SelectValue) {
    emit('update:model-value', value)
  }
})
</script>

<template>
  <USelectMenu
    v-model="model"
    size="xl"
    option-attribute="name"
    :options="store.data"
    value-attribute="id"
    :multiple="multiple"
    placeholder="Бренды"
  />
</template>
