import { useAsyncData } from '#app'
import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useRouteQueryWatcher } from '~/src/shared/lib/composables/use-route-query-watcher'
import { usePagination } from '~/src/shared/lib/composables/use-pagination'

export const useSneakersStore = defineStore('sneakers', () => {
  const { getPagePaginationQuery, currentPage, total, setTotal } = usePagination()

  const { customRoute, routeQuery, stopWatchRouter, startWatchRouter } = useRouteQueryWatcher()

  const { data: sneakersData, status, refresh } = useAsyncData('sneakers-data', fetchSneakers, {
    default: () => [] as SneakerMinDto[]
  })

  watch(() => customRoute.value?.query, async () => {
    if (customRoute.value?.query) {
      await refresh()
    }
  })

  const pending = computed(() => status.value === 'pending')
  async function fetchSneakers () {
    const { data } = await sneakersApi.getList({
      // ...routeQuery.value,
      // ...getPagePaginationQuery()
    })

    // setTotal(data.pagination.totalItems)

    return data
  }

  watch(currentPage, async () => await refresh())

  return {
    sneakersData,
    pending,
    stopWatchRouter,
    startWatchRouter,
    total,
    currentPage
  }
})
