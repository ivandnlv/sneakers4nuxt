import { useAsyncData } from '#app'
import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { useRouteQueryWatcher } from '~/src/shared/lib/composables/use-route-query-watcher'

export const useSneakersStore = defineStore('sneakers', () => {
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
    try {
      const { data } = await sneakersApi.getList(routeQuery.value)

      return data.items
    } catch (e: unknown) {
      console.log(e)
    }
  }

  return {
    sneakersData,
    pending,
    stopWatchRouter,
    startWatchRouter
  }
})
