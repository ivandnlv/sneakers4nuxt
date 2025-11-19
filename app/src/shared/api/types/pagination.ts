import type { SortDirection } from '~/src/shared/api/types/sort'

export interface PaginationQuery {
  'pagination[page]': number
  'pagination[pageSize]': number
  'pagination[withCount]': number
}

export type SortQuery = {
  sortDirection: SortDirection
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
