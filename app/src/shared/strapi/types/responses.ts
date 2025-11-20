import type { StrapiPaginationMeta } from './pagination'
import type { Pagination } from '~/src/shared/api/types'
import type { StrapiError } from '~/src/shared/api/types/strapi/error'

export interface PaginationResponse<T> {
    items: T[]
    pagination: StrapiPaginationMeta
}

export interface SuccessStrapiResponse<T = unknown>{
    data: T
    meta: {
        pagination?: Pagination
    }
}

export interface SuccessStrapiPaginationResponse<T extends any[] = unknown[]> extends SuccessStrapiResponse<T> {
    data: T
    meta: {
        pagination: Pagination
    }
}

export interface ErrorStrapiResponse {
    data: null
    error: StrapiError
}
