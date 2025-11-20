import type { StrapiPaginationMeta } from './pagination'

export interface SuccessStrapiResponse<T = unknown>{
    data: T
    meta: {
        pagination?: StrapiPaginationMeta
    }
}

export interface SuccessStrapiPaginationResponse<T extends any[] = unknown[]> extends SuccessStrapiResponse<T> {
    data: T
    meta: {
        pagination: StrapiPaginationMeta
    }
}

export interface ErrorStrapiResponse {
    data: null
    error: StrapiError
}
