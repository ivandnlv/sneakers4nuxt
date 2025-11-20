export interface StrapiEntityBase {
    id: number
    documentId: string
    name: string
    createdAt: string
    deletedAt?: string | null
    updatedAt?: string | null
    publishedAt?: string | null
}
