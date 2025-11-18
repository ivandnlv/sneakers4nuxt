import type { EntityBase } from '~/src/shared/api/types'

export interface SlideDto extends EntityBase {
  img: string
  sortIndex: number
}
