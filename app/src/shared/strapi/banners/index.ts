import type { StrapiPaginationQuery, SuccessStrapiPaginationResponse } from '~/src/shared/strapi/types'
import type { StrapiBannerEntity } from '~/src/shared/strapi/banners/types'
import { strapi } from '~/src/shared/strapi/instance'

export interface StrapiBannersApiType {
    GetList: {
        Request: StrapiPaginationQuery
        Response: SuccessStrapiPaginationResponse<StrapiBannerEntity[]>
    }
}

export const strapiBannersApi = {
  async getList (query: StrapiBannersApiType['GetList']['Request'] = {}) {
    return await strapi.$get<StrapiBannersApiType['GetList']['Response']>('/banners?populate=*', {
      query
    })
  }
}
