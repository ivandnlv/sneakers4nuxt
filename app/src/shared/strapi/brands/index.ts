import type { SuccessStrapiPaginationResponse } from '~/src/shared/strapi/types'
import type { StrapiBrandEntity } from '~/src/shared/strapi/brands/types'
import type { EntitySelectQuery } from '~/src/shared/types/ui/select-entity'
import { strapi } from '~/src/shared/strapi/instance'

export interface StrapiBrandsApiType {
  GetList: {
    Query: EntitySelectQuery
    Response: SuccessStrapiPaginationResponse<StrapiBrandEntity[]>
  }
}

export const strapiBrandsApi = {
  async getList (query: StrapiBrandsApiType['GetList']['Query'] = {}) {
    return await strapi.$get<StrapiBrandsApiType['GetList']['Response']>('/brands', {
      query
    })
  }
}
