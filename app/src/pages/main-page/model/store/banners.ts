import type { StrapiBannerEntity } from '~/src/shared/strapi/banners/types'
import { strapiBannersApi } from '~/src/shared/strapi/banners'

export const useMainPageBannersStore = defineStore('main-page-banners-store', () => {
  async function getSlides () {
    const { data } = await strapiBannersApi.getList()

    return data
  }

  const { data, pending } = useLazyAsyncData('main-page-slides', getSlides, {
    default: () => [] as StrapiBannerEntity[]
  })

  return {
    data,
    pending
  }
})
