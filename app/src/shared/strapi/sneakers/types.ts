import type { StrapiEntityBase, StrapiUploadEntity } from '~/src/shared/strapi/types'
import type { StrapiSneakersApiType } from '~/src/shared/strapi/sneakers/index'

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

export type StrapiSneakersFilters = Pick<StrapiSneakersApiType['GetList']['Query'], 'filters[brand][name][$eqi]' | 'filters[name][$containsi]'>
