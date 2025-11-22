import type { StrapiEntityBase, StrapiUploadEntity } from '~/src/shared/strapi/types'
import type { StrapiSneakerEntity } from '~/src/shared/strapi/sneakers/types'

export interface StrapiBannerEntity extends StrapiEntityBase {
    sortIndex: number
    image: StrapiUploadEntity
    mobileImage?: StrapiUploadEntity
    sneaker: StrapiSneakerEntity | null
}
