export interface StrapiPaginationQuery {
    'pagination[page]'?: number
    'pagination[pageSize]'?: number
    'pagination[withCount]'?: number
}

export interface StrapiPaginationMeta {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
