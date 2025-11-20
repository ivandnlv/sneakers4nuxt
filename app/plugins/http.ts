import { defineNuxtPlugin } from '#imports'
import { throwApiError } from '~/src/shared/api/throw-api-error'
import { initializeStrapi } from '~/src/shared/strapi/instance'

export default defineNuxtPlugin(() => {
  $http.onResponseError(throwApiError)

  // initializeApi()
  initializeStrapi()
})
