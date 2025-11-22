import type { StrapiEntityBase } from '~/src/shared/strapi/types'
import type { SelectItemObject } from '~/src/shared/types/ui/select'

export function transformBaseEntityToSelectObject (entity: StrapiEntityBase): SelectItemObject {
  return {
    value: entity.documentId,
    label: entity.name
  }
}
