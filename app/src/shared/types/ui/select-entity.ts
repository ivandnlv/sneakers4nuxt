import type { SelectMenuProps } from '#ui/types'
import type { SelectItemObject } from '~/src/shared/types/ui/select'
import type {
  StrapiBaseEntityIdQuery,
  StrapiBaseSearchQuery,
  StrapiPaginationQuery,
  SuccessStrapiPaginationResponse
} from '~/src/shared/strapi/types'

export type EntitySelectQuery = StrapiPaginationQuery & StrapiBaseSearchQuery & StrapiBaseEntityIdQuery

export type EntitySelectFetchList = (
  query?: EntitySelectQuery
) => Promise<SuccessStrapiPaginationResponse<SelectItemObject[]>>
export type EntitySelectFetchSelected = (query: StrapiBaseEntityIdQuery) => Promise<SelectItemObject[]>

export interface EntitySelectBaseProps {
  disabled?: boolean
  multiple?: boolean
  portal?: boolean
  placeholder?: string
  searchPlaceholder?: string
  size?: 'xs' | 'md' | 'lg'
  loadOnMount?: boolean
  ui?: SelectMenuProps['ui']
  limit?: number
  infiniteScroll?: boolean
}

export interface EntitySelectProps extends EntitySelectBaseProps {
  fetchListFunction: EntitySelectFetchList
  fetchSelectedFunction: EntitySelectFetchSelected
}
