import type { EntityBase } from '~/src/shared/api/types/responses'
import { generateUUID } from '~/src/shared/lib/mock/generate-uuid'

export function createMockEntityBase (name = ''): EntityBase {
  return {
    id: generateUUID(),
    name,
    createdAt: '',
    deletedAt: null,
    updatedAt: ''
  }
}
