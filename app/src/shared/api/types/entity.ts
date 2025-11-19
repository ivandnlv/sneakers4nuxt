export interface EntityBaseDates {
  createdAt: string
  deletedAt?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
}

export interface EntityBase extends EntityBaseDates {
  id: number
  documentId: string
  name: string
}
