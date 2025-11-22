export interface EntityBaseDates {
  createdAt: string
  deletedAt?: string | null
  updatedAt?: string
}

export interface EntityBase extends EntityBaseDates {
  id: string
  name: string
}
