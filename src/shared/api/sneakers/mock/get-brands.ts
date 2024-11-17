import type { SneakerBrand } from '~/src/shared/api/sneakers/types'
import { createMockEntityBase } from '~/src/shared/lib/mock/create-mock-entity-base'
import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { PaginationResponse } from '~/src/shared/api/types'

export const brands: SneakerBrand[] = [
  createMockEntityBase('nike'),
  createMockEntityBase('adidas'),
  createMockEntityBase('puma'),
  createMockEntityBase('under-armor'),
  createMockEntityBase('jordan')
]

export const brandsResponse: SuccessResponse<PaginationResponse<SneakerBrand>> = {
  code: 200,
  error: null,
  data: {
    items: brands,
    pagination: {
      totalPages: 1,
      totalItems: brands.length,
      itemsPerPage: 8,
      itemCount: brands.length,
      currentPage: 1
    }
  }
}
