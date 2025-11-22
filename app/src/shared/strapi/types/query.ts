export interface StrapiBaseSearchQuery {
  'filters[name][$containsi]'?: string
}

export interface StrapiBaseEntityIdQuery {
  'filters[documentId][$eq]'?: string | string[]
}

export interface StrapiPaginationQuery {
  'pagination[page]'?: number
  'pagination[pageSize]'?: number
  'pagination[withCount]'?: number
}
