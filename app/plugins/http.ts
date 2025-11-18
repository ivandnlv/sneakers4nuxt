import { defineNuxtPlugin } from '#imports'
import { throwApiError } from '~/src/shared/api/throw-api-error'
import { initializeApi } from '~/src/shared/api/instance'

export default defineNuxtPlugin(() => {
  $http.onResponseError(throwApiError)

  initializeApi()
})
