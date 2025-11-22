import type { PaginationResponse } from '~/src/shared/api/types'

export interface SelectItem<T extends string = string> {
  id: T
  name: string
}

export type SelectValue = SelectItem | SelectItem[] | undefined

export type SelectSearchResponse<T extends string = string> = PaginationResponse<SelectItem<T>>

export type SelectModelValue = string | string[] | undefined
