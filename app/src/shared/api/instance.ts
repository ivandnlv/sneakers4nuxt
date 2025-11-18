import type { FetchInstance } from '@refactorjs/ofetch'
import type { ReturnType } from 'birpc'
import { throwApiError } from '~/src/shared/api/throw-api-error'
import { apiFactory } from '~/src/shared/api/api-factory'

let apiInstance: FetchInstance

// eslint-disable-next-line import/no-mutable-exports
export let api: ReturnType<typeof apiFactory>

export function initializeApi () {
  if (api) {
    return api
  }

  apiInstance = $http.create({
    baseURL: `${process.server ? useRuntimeConfig().public.apiUrl : ''}/api`
  })

  apiInstance.onResponseError(throwApiError)

  api = apiFactory(apiInstance)

  return api
}
