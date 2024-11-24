import type { EntityBase } from '~/src/shared/api/types/entity'

export interface SneakerMinDto extends EntityBase {
  cover?: string
  price: number
  oldPrice?: number
  isFavorite: boolean
  isInCart: boolean
}

export type SneakerBrand = EntityBase

export interface SneakerDto extends SneakerMinDto {
  sizes: {
    number: number
    isAvailable: boolean
  }[]
  description: string
  photos: string[]
  modelName: string
  brand: SneakerBrand
}
