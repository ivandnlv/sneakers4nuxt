import type { UUID } from 'node:crypto'
import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { SneakerBrand, SneakerDto, SneakerMinDto } from '~/src/shared/api/sneakers/types'
import type { PaginationQuery, SortQuery } from '~/src/shared/api/types/pagination'
import type { PaginationResponse } from '~/src/shared/api/types'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'
import { sneakerByIdMockRequest } from '~/src/shared/api/sneakers/mock/get-by-id'
import { sneakersListMockResponse } from '~/src/shared/api/sneakers/mock/get-list'
import { brandsResponse } from '~/src/shared/api/sneakers/mock/get-brands'

export interface SneakersApiType {
  GetById: {
    Response: SuccessResponse<SneakerDto>
  }

  GetList: {
    Params: Partial<{
      search: string
      brands: string[]
      withSale: boolean
    } & SortQuery & PaginationQuery>
    Response: SuccessResponse<PaginationResponse<SneakerMinDto>>
  }

  GetBrands: {
    Response: SuccessResponse<SneakerBrand[]>
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
  async getList (_: SneakersApiType['GetList']['Params']) {
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
