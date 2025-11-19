import type { Pagination, PaginationQuery } from './pagination'

export type * from './entity'
export type * from './upload'
export type { Pagination, PaginationQuery }
export interface SearchQuery {
  search: string
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: Pagination
}
