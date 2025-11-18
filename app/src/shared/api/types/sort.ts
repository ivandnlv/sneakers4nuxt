export type SortDirection = 'asc' | 'desc' | 'ASC' | 'DESC'
export type SortByEntityDates = 'createdAt' | 'updatedAt'

export type SortRecord<T extends string = SortByEntityDates> = Record<T, SortDirection>

export const sortDirRuOptions: { id: SortDirection, name: string }[] = [
  {
    id: 'asc',
    name: 'По возрастанию'
  },
  {
    id: 'desc',
    name: 'По убыванию'
  }
]
