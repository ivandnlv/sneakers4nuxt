import type { SelectMenuProps } from '#ui/types'
import type { SelectItemObject } from '~/src/shared/types/ui/select'
import type {
  StrapiBaseEntityIdQuery,
  StrapiBaseSearchQuery,
  StrapiPaginationQuery,
  SuccessStrapiPaginationResponse
} from '~/src/shared/strapi/types'

export type StrapiEntitySelectQuery = StrapiPaginationQuery & StrapiBaseSearchQuery & StrapiBaseEntityIdQuery

export type StrapiEntitySelectFetchList = (
  query?: StrapiEntitySelectQuery
) => Promise<SuccessStrapiPaginationResponse<SelectItemObject[]>>
export type StrapiEntitySelectFetchSelected = (query: StrapiBaseEntityIdQuery) => Promise<SelectItemObject[]>

export interface StrapiEntitySelectBaseProps {
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

export interface StrapiEntitySelectProps extends StrapiEntitySelectBaseProps {
  fetchListFunction: StrapiEntitySelectFetchList
  fetchSelectedFunction: StrapiEntitySelectFetchSelected
}
