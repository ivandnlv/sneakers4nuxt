import type { PaginationQuery, SortQuery } from '~/src/shared/api/types/pagination'
import type { SuccessStrapiPaginationResponse } from '~/src/shared/strapi/types'
import type { StrapiSneakerEntity } from '~/src/shared/strapi/sneakers/types'

export interface StrapiSneakersApiType {
    GetList: {
        Params: Partial<{
            search: string
            brands: string[]
            withSale: boolean
        } & SortQuery & PaginationQuery>
        Response: SuccessStrapiPaginationResponse<StrapiSneakerEntity[]>
    }

}
