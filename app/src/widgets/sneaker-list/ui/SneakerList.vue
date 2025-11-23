<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import type { StrapiSneakersFilters } from '../model/types'
import { mapStrapiSneakerToMin } from '../model/map-strapi-sneaker-to-min'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { strapiModel } from '~/src/entities/strapi'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { SneakerCard, SneakerCardLoader } from '~/src/entities/sneaker'
import UiEmpty from '~/src/shared/ui/UiEmpty.vue'
import UiButtonLoadMore from '~/src/shared/ui/button/UiButtonLoadMore.vue'
import type { StrapiPaginationQuery, SuccessStrapiPaginationResponse } from '~/src/shared/strapi/types'
import type { StrapiSneakerEntity } from '~/src/shared/strapi/sneakers/types'
import { useInfiniteScrollFetch } from '~/src/shared/composables/use-infinite-scroll-fetch'
import { ExternalIcons } from '~/src/shared/types/icons/external-icons'
import { AddToCartBtn } from '~/src/features/cart/add-to-cart'
import { AddToFavBtn } from '~/src/features/favorites/add-to-favorites'

const SneakerListFilters = defineAsyncComponent(() => import('./filters/SneakerListFilters.vue'))

export type SneakerListFetchListFunction = (query: StrapiPaginationQuery & {
  'filters[name][$containsi]'?: string
  'filters[brand][documentId][$eq]'?: string[] | string
}) => Promise<SuccessStrapiPaginationResponse<StrapiSneakerEntity[]>>

const props = withDefaults(defineProps<{
  uniqueId: string
  limit?: number
  itemsUi?: string
  infiniteScroll?: boolean
  needFilters?: boolean
  fetchListFunction: SneakerListFetchListFunction
}>(), {
  limit: 6,
  itemsUi: '',
  needFilters: true
})

const [isInitialized, toggleInitialized] = useToggle()

const { getPagePaginationQuery, setMeta, next, setFirstPage, isLastPage } = strapiModel.useStrapiPagination({
  uniqueId: props.uniqueId,
  limit: props.limit
})

const filters = reactive<StrapiSneakersFilters>({
  search: undefined,
  brands: undefined
})

async function fetchSneakers () {
  try {
    const { data, meta } = await props.fetchListFunction({
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
  if (props.infiniteScroll) {
    await promiseTimeout(1000)
  }
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

if (props.infiniteScroll) {
  useInfiniteScrollFetch({
    isLastPage,
    loadMoreCallback: loadMore
  })
}
</script>

<template>
  <div
    :class="{
      'flex flex-col': isInitialEmpty || !needFilters,
      'grid grid-cols-[1fr_320px] gap-6': !isInitialEmpty && needFilters
    }"
  >
    <div
      :class="['grid sm:grid-cols-1 md:grid-cols-2 w-full lg:pb-[20px] lg:grid-cols-3 gap-6', itemsUi]"
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
        >
          <template #leading-feature>
            <AddToFavBtn class="absolute top-4 left-4" :sneaker="sneaker" />
          </template>

          <template #trailing-feature>
            <AddToCartBtn :sneaker="sneaker" />
          </template>
        </SneakerCard>

        <template v-if="infiniteScroll">
          <div v-if="morePending" class="flex flex-col items-center justify-center col-span-full">
            <UIcon
              class="size-8 text-primary col-span-full"
              :name="ExternalIcons.SVG_SPINNER_3_DOTS"
            />
          </div>
        </template>

        <UiButtonLoadMore
          v-else
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

    <template v-if="needFilters">
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
    </template>
  </div>
</template>
