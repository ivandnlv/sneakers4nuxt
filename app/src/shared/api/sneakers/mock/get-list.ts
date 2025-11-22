import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'
import { createMockEntityBase } from '~/src/shared/helpers/mock/create-mock-entity-base'
import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { PaginationResponse } from '~/src/shared/api/types'

const sneakersList: SneakerMinDto[] = [
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Blazer Mid Suede'),
    cover: 'https://i.imgur.com/F2oQHtU.jpeg',
    price: 12999,
    isFavorite: true,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Air Max 270'),
    cover: 'https://i.imgur.com/c1LcxPe.jpeg',
    price: 12999,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Blazer Mid Suede'),
    cover: 'https://i.imgur.com/Ae3BlAg.jpeg',
    price: 8499,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Under Armour Curry 8'),
    cover: 'https://i.imgur.com/8Qcrc6x.jpeg',
    price: 15199,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Kyrie 7'),
    cover: 'https://i.imgur.com/8gzbG5B.jpeg',
    price: 5299,
    oldPrice: 11290,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Jordan Air Jordan 11'),
    cover: 'https://i.imgur.com/LyF39Rn.jpeg',
    price: 10799,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Lebron XVIII Low'),
    cover: 'https://i.imgur.com/mav3yrw.jpeg',
    price: 13999,
    isFavorite: false,
    isInCart: false
  },
  {
    ...createMockEntityBase('Мужские Кроссовки Nike Blazer Mid Suede'),
    cover: 'https://i.imgur.com/F2oQHtU.jpeg',
    price: 8499,
    isFavorite: false,
    isInCart: false
  }
]

export const sneakersListMockResponse: SuccessResponse<PaginationResponse<SneakerMinDto>> = {
  data: {
    items: sneakersList,
    pagination: {
      currentPage: 1,
      itemCount: sneakersList.length,
      itemsPerPage: 9,
      totalItems: sneakersList.length * 2,
      totalPages: 1
    }
  },
  error: null,
  code: 200
}
