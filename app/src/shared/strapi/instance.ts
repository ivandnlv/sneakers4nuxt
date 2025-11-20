import type { FetchInstance } from '@refactorjs/ofetch'
import type { ReturnType } from 'birpc'
import { throwApiError } from '~/src/shared/api/throw-api-error'
import { apiFactory } from '~/src/shared/api/api-factory'

let strapiInstance: FetchInstance

// eslint-disable-next-line import/no-mutable-exports
export let strapi: ReturnType<typeof apiFactory>

export function initializeStrapi () {
  if (strapi) {
    return strapi
  }

  const config = useRuntimeConfig()

  strapiInstance = $http.create({
    baseURL: `${import.meta.server ? config.public.strapiBase : ''}${import.meta.server ? '/api' : '/api/strapi'}`
  })

  strapiInstance.onResponseError(throwApiError)

  strapi = apiFactory(strapiInstance)

  return strapi
}
