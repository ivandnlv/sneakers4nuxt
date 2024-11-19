<script setup lang="ts">
import type { LocationQueryRaw } from '#vue-router'
import { type SortDirection, sortDirRuOptions } from '~/src/shared/api/types/sort'
import { SneakersApiType } from '~/src/shared/api/sneakers'
import BrandSelect from '~/src/entities/brand/ui/BrandSelect.vue'

const router = useRouter()
const route = useRoute()

const filters: SneakersApiType.GetList.Params = reactive({
  sortDirection: route.query?.sortDirection as SortDirection ?? 'asc',
  withSale: route.query?.withSale ? route.query?.withSale === 'true' : false,
  brands: route.query?.brands as string[] ?? []
})

const replaceRouterByFilters = async () => {
  await router.replace({
    ...route,
    query: filters as LocationQueryRaw
  })
}

watch(filters, replaceRouterByFilters, { deep: true })
</script>

<template>
  <UCard
    class="w-full h-fit "
    :ui="{
      body: {
        base: 'flex flex-col gap-6'
      }
    }"
  >
    <UFormGroup
      label="Сортировка (цена)"
    >
      <USelect
        v-model="filters.sortDirection"
        :options="sortDirRuOptions"
        value-attribute="id"
        option-attribute="name"
        size="xl"
      />
    </UFormGroup>

    <UFormGroup label="Бренды">
      <BrandSelect v-model="filters.brands" :multiple="true" />
    </UFormGroup>

    <UCheckbox v-model="filters.withSale" label="Со скидкой" />
  </UCard>
</template>
