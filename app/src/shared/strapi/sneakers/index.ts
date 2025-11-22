import type { StrapiPaginationQuery, SuccessStrapiPaginationResponse } from '~/src/shared/strapi/types'
import type { StrapiSneakerEntity } from '~/src/shared/strapi/sneakers/types'
import { strapi } from '~/src/shared/strapi/instance'

export interface StrapiSneakersApiType {
    GetList: {
        Query: Partial<{
            'filters[name][$containsi]': string
            'filters[brand][documentId][$eq]': string[] | string
        } & StrapiPaginationQuery>
        Response: SuccessStrapiPaginationResponse<StrapiSneakerEntity[]>
    }

}

export const strapiSneakersApi = {
  async getList (query: StrapiSneakersApiType['GetList']['Query']) {
    return await strapi.$get<StrapiSneakersApiType['GetList']['Response']>('/sneakers?populate=*', {
      query
    })
  }
}
