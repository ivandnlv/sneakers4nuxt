import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { Pagination } from '~/src/shared/api/types'
import type { StrapiError } from '~/src/shared/api/types/strapi/error'

export interface PaginationResponse<T> {
    items: T[]
    pagination: StrapiPaginationMeta
}

export interface SuccessStrapiResponse<T = unknown> extends SuccessResponse<T>{
    meta: {
        pagination: Pagination
    }
}

export interface ErrorStrapiResponse {
    data: null
    error: StrapiError
}
