import type { UUID } from 'node:crypto'
import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { SneakerBrand, SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import type { PaginationQuery, SortQuery } from '~/src/shared/api/types/pagination'
import type { PaginationResponse } from '~/src/shared/api/types'
// import { api } from '~/src/shared/api/instance'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'
import { sneakerByIdMockRequest } from '~/src/shared/api/sneakers/mock/get-by-id'
import { sneakersListMockResponse } from '~/src/shared/api/sneakers/mock/get-list'
// import { api } from '~/src/shared/api/instance'
import { brandsResponse } from '~/src/shared/api/sneakers/mock/get-brands'

export namespace SneakersApiType {
  export namespace GetById {
    export type Response = SuccessResponse<SneakerDto>
  }

  export namespace GetList {
    export type Params = Partial<{
      search: string
      brands: string[]
      withSale: boolean
    } & SortQuery & PaginationQuery>

    export type Response = SuccessResponse<PaginationResponse<SneakerMinDto>>
  }

  export namespace GetBrands {
    export type Response = SuccessResponse<SneakerBrand[]>
  }
}

export const sneakersApi = {
  // TODO: Добавить параметр
  async getById (_: UUID) {
    // Real:
    // return await api.$get<SneakersApiType.GetById.Response>(`/sneakers/${id}`)
    // Mock:
    await mockRequest()
    return sneakerByIdMockRequest
  },

  // TODO: Добавить параметр
  async getList (_: SneakersApiType.GetList.Params) {
    // Real:
    // return await api.$get<SneakersApiType.GetList.Response>('/sneakers', {
    //   query: params
    // })

    // Mock:
    await mockRequest()
    return sneakersListMockResponse
  },

  async getBrands () {
    // Real:
    // return await api.$get<SneakersApiType.GetBrands.Response>('/sneakers/brands', {
    //   query: params
    // })

    // Mock:
    await mockRequest()
    return brandsResponse
  }
}
