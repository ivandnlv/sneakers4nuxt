import type { EntityBase } from '~/src/shared/api/types/entity'
import type { UploadEntity } from '~/src/shared/api/types'

export interface SneakerMinDto extends EntityBase {
  cover?: UploadEntity
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
