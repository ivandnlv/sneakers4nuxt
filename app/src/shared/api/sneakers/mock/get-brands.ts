import type { SneakerBrand } from '~/src/shared/api/sneakers/types'
import { createMockEntityBase } from '~/src/shared/lib/mock/create-mock-entity-base'
import type { SneakersApiType } from '~/src/shared/api/sneakers'

export const brands: SneakerBrand[] = [
  createMockEntityBase('nike'),
  createMockEntityBase('adidas'),
  createMockEntityBase('puma'),
  createMockEntityBase('under-armor'),
  createMockEntityBase('jordan')
]

export const brandsResponse: SneakersApiType['GetBrands']['Response'] = {
  code: 200,
  error: null,
  data: brands
}
