import type { Pagination, PaginationQuery, PagePaginationQuery, OffsetPaginationQuery } from './pagination'

export type * from './entity'
export type { Pagination, PaginationQuery, PagePaginationQuery, OffsetPaginationQuery }
export interface SearchQuery {
  search: string
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: Pagination
}
