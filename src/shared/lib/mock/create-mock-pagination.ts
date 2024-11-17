import type { Pagination } from '~/src/shared/api/types/responses'

export function createMockPagination (
  totalItems: number,
  pagination: Omit<Pagination, 'totalItems'> = {
    currentPage: 1,
    itemCount: 1,
    itemsPerPage: 1,
    totalPages: 1
  }
): Pagination {
  return {
    totalItems,
    ...pagination
  }
}
