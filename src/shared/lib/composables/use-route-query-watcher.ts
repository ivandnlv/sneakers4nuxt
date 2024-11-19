import type { RouteLocationNormalizedLoadedGeneric } from '#vue-router'
import { useRoute } from '#app'

export const useRouteQueryWatcher = () => {
  const customRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(useRoute())

  const routeQuery = computed(() => {
    return customRoute.value?.query ?? {}
  })

  function stopWatchRouter () {
    customRoute.value = null
  }

  function startWatchRouter () {
    customRoute.value = useRoute()
  }

  return {
    customRoute,
    routeQuery,
    stopWatchRouter,
    startWatchRouter
  }
}
