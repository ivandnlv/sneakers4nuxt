import type { UUID } from 'node:crypto'
import { defineStore } from '#imports'
import { useStrapiPagination } from '~/src/shared/composables/use-strapi-pagination'
import { strapiSneakersApi } from '~/src/shared/strapi/sneakers'
import type { StrapiSneakerEntity, StrapiSneakersFilters } from '~/src/shared/strapi/sneakers/types'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { transformStrapiUploadToProxy } from '~/src/shared/helpers'

function mapStrapiSneakerToMin (sneaker: StrapiSneakerEntity): SneakerMinDto {
  return {
    id: sneaker.documentId as UUID,
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

export const useSneakersStrapiStore = defineStore('sneakers-strapi-store', () => {
  const { getPagePaginationQuery, setMeta, next, setFirstPage } = useStrapiPagination({
    limit: 6
  })

  const filters = reactive<StrapiSneakersFilters>({
    search: undefined,
    brands: undefined
  })

  async function fetchSneakers () {
    const { data, meta } = await strapiSneakersApi.getList({
      ...getPagePaginationQuery(),
      'filters[name][$containsi]': filters.search,
      'filters[brand][documentId][$eq]': filters.brands
    })

    setMeta(meta.pagination)

    return data.map(mapStrapiSneakerToMin)
  }

  const { data, pending, refresh } = useAsyncData('sneakers-strapi-data', fetchSneakers, {
    default: () => [] as SneakerMinDto[]
  })

  const { runWithLoading: loadMore, isLoading: morePending } = useTryCatchWithLoading(async () => {
    next()
    const newItems = await fetchSneakers()
    data.value = [...data.value, ...newItems]
  })

  const resetAndRefresh = async () => {
    setFirstPage()
    await refresh()
  }

  watch(filters, resetAndRefresh)

  return {
    data,
    pending,
    loadMore,
    morePending,
    resetAndRefresh,
    filters
  }
})
