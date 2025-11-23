<script setup lang="ts">
import type { StrapiSneakersFilters } from '../model/types'
import { mapStrapiSneakerToMin } from '../model/map-strapi-sneaker-to-min'
import SneakerListFilters from './filters/SneakerListFilters.vue'
import { strapiSneakersApi } from '~/src/shared/strapi/sneakers'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { strapiModel } from '~/src/entities/strapi'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { SneakerCard, SneakerCardLoader } from '~/src/entities/sneaker'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'
import UiButtonLoadMore from '~/src/shared/ui/button/UiButtonLoadMore.vue'

const [isInitialized, toggleInitialized] = useToggle()

const { getPagePaginationQuery, setMeta, next, setFirstPage, isLastPage } = strapiModel.useStrapiPagination({
  limit: 6
})

const filters = reactive<StrapiSneakersFilters>({
  search: undefined,
  brands: undefined
})

async function fetchSneakers () {
  try {
    const { data, meta } = await strapiSneakersApi.getList({
      ...getPagePaginationQuery(),
      'filters[name][$containsi]': filters.search,
      'filters[brand][documentId][$eq]': filters.brands
    })

    setMeta(meta.pagination)

    return data.map(mapStrapiSneakerToMin)
  } finally {
    if (!isInitialized.value) {
      toggleInitialized(true)
    }
  }
}

const { data, pending, refresh } = useAsyncData('sneakers-strapi-data', fetchSneakers, {
  default: () => [] as SneakerMinDto[]
})

const { runWithLoading: loadMore, isLoading: morePending } = useTryCatchWithLoading(async () => {
  next()
  const newItems = await fetchSneakers()
  data.value = [...data.value, ...newItems]
})

const resetAndRefresh = async () => {
  setFirstPage()
  await refresh()
}

watch(filters, resetAndRefresh)

const isFiltersClear = computed(() => {
  for (const _key in filters) {
    const currentValue = filters[_key as keyof typeof filters]

    if ((Array.isArray(currentValue) && currentValue.length > 0) || (!Array.isArray(currentValue) && !!currentValue)) { return false }
  }

  return true
})

const currentPending = computed(() => pending.value || morePending.value)

const isInitialEmpty = computed(() => {
  if (currentPending.value || !isInitialized.value) { return false }

  return isFiltersClear.value && !data.value.length
})
</script>

<template>
  <div :class="isInitialEmpty ? 'flex flex-col' : 'grid grid-cols-[1fr_320px] gap-6'">
    <div
      class="grid sm:grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-6"
    >
      <template v-if="pending">
        <SneakerCardLoader v-for="i in 8" :key="`skeleton-${i}`" />
      </template>

      <template v-else-if="data.length">
        <SneakerCard
          v-for="(sneaker, i) in data"
          :key="`sneaker-${i}`"
          class="relative w-full"
          :sneaker="sneaker"
        />

        <UiButtonLoadMore
          :is-last-page="isLastPage"
          class="block lg:col-start-2"
          :loading="morePending"
          @click="loadMore()"
        />
      </template>

      <UiEmpty
        v-else
        class="col-span-full"
        body-ui="min-h-[500px]"
        :title="isFiltersClear ? 'Тут пусто' : 'По вашему запросу ничего не найдено'"
      />
    </div>

    <ClientOnly v-if="!isInitialEmpty">
      <SneakerListFilters
        v-model="filters"
        :disabled="currentPending"
        :is-filters-clear="isFiltersClear"
      />

      <template #fallback>
        <div class="flex flex-col gap-4 w-full rounded-md">
          <USkeleton class="w-full h-10" />

          <USkeleton class="w-full h-[180px] rounded-xl" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
