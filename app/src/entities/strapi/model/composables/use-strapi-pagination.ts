import type { StrapiPaginationQuery, StrapiPaginationMeta } from '~/src/shared/strapi/types'

export interface UseStrapiPaginationParams {
  uniqueId: string
  page?: number
  limit?: number
}

export const useStrapiPagination = ({ limit, page, uniqueId }: UseStrapiPaginationParams = { limit: 10, page: 1, uniqueId: '' }) => {
  const paginationMeta = useState<StrapiPaginationMeta | null>(`use-strapi-pagination-meta-${uniqueId}`, () => null)

  const currentPageSize = computed(() => paginationMeta.value?.pageSize ?? limit)

  const currentPage = ref(page || 1)

  function setMeta (meta: StrapiPaginationMeta) {
    paginationMeta.value = meta
  }

  watch(paginationMeta, () => {
    currentPage.value = paginationMeta.value?.page ?? 1
  })

  const total = computed(() => paginationMeta.value?.total ?? 0)

  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === paginationMeta.value?.pageCount)

  function getPagePaginationQuery (): StrapiPaginationQuery {
    return {
      'pagination[page]': currentPage.value,
      'pagination[pageSize]': currentPageSize.value
    }
  }

  function setFirstPage () {
    currentPage.value = 1
  }

  function prev () {
    if (currentPage.value - 1 > 1) {
      currentPage.value--
    }
  }

  function next () {
    currentPage.value++
  }

  return {
    paginationMeta,
    setMeta,
    currentPageSize,
    total,
    isFirstPage,
    isLastPage,
    getPagePaginationQuery,
    setFirstPage,
    prev,
    next,
    currentPage
  }
}
