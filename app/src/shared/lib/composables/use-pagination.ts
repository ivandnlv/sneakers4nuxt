export interface UsePaginationParams {
  page?: number
  limit?: number
}

export const usePagination = ({ limit, page }: UsePaginationParams = { limit: 0, page: 0 }) => {
  const total = ref(0)

  const setTotal = (value: number) => {
    total.value = value
  }

  const currentPageSize = ref(limit || 10)

  const currentPage = ref(page || 1)

  const pageCount = computed(() => Math.max(1, Math.ceil(total.value / currentPageSize.value)))

  const isFirstPage = computed(() => currentPage.value === 1)

  const isLastPage = computed(() => currentPage.value === pageCount.value)

  const getPagePaginationQuery = () => {
    return {
      limit: currentPageSize.value,
      page: currentPage.value
    }
  }

  const setPage = (value: number) => {
    currentPage.value = value
  }

  const setFirstPage = () => {
    currentPage.value = 1
  }

  const prev = () => {
    if (currentPage.value - 1 > 1) {
      currentPage.value--
    }
  }

  const next = () => {
    currentPage.value++
  }

  return {
    total,
    setTotal,
    currentPage,
    isFirstPage,
    isLastPage,
    getPagePaginationQuery,
    setPage,
    setFirstPage,
    prev,
    next
  }
}
