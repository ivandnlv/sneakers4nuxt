<script setup lang="ts">
import type { LocationQueryRaw } from '#vue-router'
import { type SortDirection, sortDirRuOptions } from '~/src/shared/api/types/sort'
import { useSneakersStore } from '~/src/entities/sneaker/model/store/sneakers-store'
import { SneakersApiType } from '~/src/shared/api/sneakers'

const router = useRouter()
const route = useRoute()

const filters: SneakersApiType.GetList.Params = reactive({
  sortDirection: route.query?.sortDirection as SortDirection ?? 'asc'
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
  <UCard class="w-full h-fit">
    <UFormGroup label="Сортировать по">
      <USelect
        v-model="filters.sortDirection"
        :options="sortDirRuOptions"
        value-attribute="id"
        option-attribute="name"
        size="xl"
      />
    </UFormGroup>
  </UCard>
</template>
