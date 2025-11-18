import type { EntityBase } from '~/src/shared/api/types/entity'

export interface SneakerMinDto extends EntityBase {
  cover?: string
  price: number
  oldPrice?: number
  isFavorite: boolean
  isInCart: boolean
}

export type SneakerBrand = EntityBase

export interface SneakerSize {
  number: number
  isAvailable: boolean
}
export interface SneakerDto extends SneakerMinDto {
  description: string
  sizes: SneakerSize[]
  photos: string[]
  modelName: string
  brand: SneakerBrand
}
