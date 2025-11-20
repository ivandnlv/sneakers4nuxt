import type { Pagination, PaginationQuery } from '~/src/shared/api/types'
import type { StrapiPaginationMeta } from '~/src/shared/api/types/strapi/pagination'

export interface UseStrapiPaginationParams {
    page?: number
    limit?: number
}

export const useStrapiPagination = ({ limit, page }: UseStrapiPaginationParams = { limit: 10, page: 1 }) => {
  const paginationMeta = ref<StrapiPaginationMeta | null>(null)

  function setMeta (meta: StrapiPaginationMeta) {
    paginationMeta.value = meta
  }

  return {
    paginationMeta,
    setMeta
  }
}
