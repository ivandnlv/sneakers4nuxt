import type { FetchInstance } from '@refactorjs/ofetch'
import type { ReturnType } from 'birpc'
import { apiFactory } from '~/src/shared/api/api-factory'

let strapiInstance: FetchInstance

// eslint-disable-next-line import/no-mutable-exports
export let strapi: ReturnType<typeof apiFactory>

export function initializeStrapi () {
  if (strapi) {
    return strapi
  }

  strapiInstance = $http.create({
    baseURL: `${import.meta.server ? 'http://localhost:3000' : ''}/api/strapi`
  })

  strapiInstance.onRequest((config) => {
    if (import.meta.server) return

    const { token } = useAuth()

    if (!token.value) return

    if (!config?.headers) config.headers = {} as Record<string, string>

    (config.headers as Record<string, string>).authorization = `Bearer ${token.value}`
  })

  strapi = apiFactory(strapiInstance)

  return strapi
}
