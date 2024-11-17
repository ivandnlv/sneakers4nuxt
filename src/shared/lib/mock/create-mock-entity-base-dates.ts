import type { EntityBaseDates } from '~/src/shared/api/types/responses'

export function createMockEntityBaseDates (): EntityBaseDates {
  const date = new Date().toISOString()

  return {
    createdAt: date,
    deletedAt: null,
    updatedAt: date
  }
}
