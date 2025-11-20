import type { StrapiEntityBase, StrapiUploadEntity } from '~/src/shared/strapi/types'

export interface SneakerSize extends StrapiEntityBase {
    number: number
}

export type SneakerBrand = StrapiEntityBase

export interface StrapiSneakerEntity extends StrapiEntityBase {
    cover?: StrapiUploadEntity
    price: number
    oldPrice?: number
    description: string
    size: SneakerSize[]
    modelName: string
    brand: SneakerBrand
}
