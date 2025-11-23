import type { StrapiSneakerEntity } from '~/src/shared/strapi/sneakers/types'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { transformStrapiUploadToProxy } from '~/src/shared/helpers'

export function mapStrapiSneakerToMin (sneaker: StrapiSneakerEntity): SneakerMinDto {
  return {
    id: sneaker.documentId as string,
    cover: sneaker?.cover?.url ? transformStrapiUploadToProxy(sneaker.cover.url) : undefined,
    createdAt: sneaker.createdAt,
    deletedAt: sneaker.deletedAt,
    isFavorite: false,
    isInCart: false,
    name: sneaker.name,
    price: sneaker.price,
    oldPrice: sneaker.oldPrice,
    updatedAt: sneaker.updatedAt ?? undefined
  }
}
