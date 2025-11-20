import type { SortDirection } from '~/src/shared/api/types/sort'

interface BasePaginationQuery {
  limit: number
}

export interface OffsetPaginationQuery extends BasePaginationQuery {
  offset: number
}

export interface PagePaginationQuery extends BasePaginationQuery {
  page: number
}

export type PaginationQuery = OffsetPaginationQuery | PagePaginationQuery

export type SortQuery = {
  sortDirection: SortDirection
}

export interface Pagination {
  currentPage: number
  itemCount: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
