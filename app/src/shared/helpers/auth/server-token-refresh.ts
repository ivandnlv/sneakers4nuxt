import type { StrapiAuthTokensRTO } from '~/src/shared/strapi/auth/types'

export async function serverTokenRefresh (refreshToken: string) {
  try {
    return await $fetch<StrapiAuthTokensRTO>('http://192.168.31.220:1337/api/auth/refresh', {
      method: 'POST',
      body: {
        refreshToken
      }
    })
  } catch (_e) {
    return null
  }
}
