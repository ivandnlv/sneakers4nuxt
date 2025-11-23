<script setup lang="ts">
import type { StrapiSneakersFilters } from '../../model/types'
import SneakerListFiltersBrand from '~/src/widgets/sneaker-list/ui/filters/SneakerListFiltersBrand.vue'
import { debouncedRef } from '#imports'

defineProps<{
  disabled?: boolean
  isFiltersClear?: boolean
}>()

const filtersModel = defineModel<StrapiSneakersFilters>({
  required: true
})

const search = ref<string | undefined>()
const debouncedSearch = debouncedRef(search, 500)

watch(debouncedSearch, () => (filtersModel.value.search = search.value))
watch(() => filtersModel.value.search, newVal => (search.value = newVal))

const onResetFilters = () => {
  filtersModel.value.search = undefined
  filtersModel.value.brands = undefined
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UInput
      v-model="search"
      size="xl"
      :disabled="disabled"
      placeholder="Поиск по названию"
    />

    <UCard
      class="w-full h-fit"
      :ui="{
        body: 'flex flex-col gap-6'
      }"
    >
      <UFormField label="Бренд">
        <SneakerListFiltersBrand
          v-model="filtersModel.brands"
          :disabled="disabled"
        />
      </UFormField>

      <UButton
        size="xl"
        color="gray"
        :disabled="isFiltersClear || disabled"
        @click="onResetFilters"
      >
        Сбросить
      </UButton>
    </UCard>
  </div>
</template>
