import type { Pagination } from '~/src/shared/api/types/pagination'

export interface ErrorResponse {
  data: null
  error: Error
}

export interface SuccessResponse<T = unknown> {
  data: T
  meta: object
}

export interface SuccessPaginationResponse<T = unknown> extends SuccessResponse<T>{
  meta: {
    pagination: Pagination
  }
}
