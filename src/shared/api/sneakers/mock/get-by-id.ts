import type { SneakerDto } from '~/src/shared/api/sneakers/types'
import { createMockEntityBase } from '~/src/shared/lib/mock/create-mock-entity-base'
import type { SuccessResponse } from '~/src/shared/api/types/responses'
import { generateUUID } from '~/src/shared/lib/mock/generate-uuid'

const sneakerMock: SneakerDto = {
  ...createMockEntityBase('Мужские Кроссовки Nike Blazer Mid Suede'),
  cover: 'https://i.imgur.com/F2oQHtU.jpeg',
  price: 12999,
  sizes: [
    {
      number: 40,
      isAvailable: true
    },
    {
      number: 41,
      isAvailable: false
    },
    {
      number: 42,
      isAvailable: true
    },
    {
      number: 43,
      isAvailable: true
    }
  ],
  photos: [
    'https://i.imgur.com/Klx6it7.jpeg',
    'https://i.imgur.com/4qcdEvI.jpeg',
    'https://i.imgur.com/82tdzfU.jpeg'
  ],
  modelName: 'Nike Blazer Mid Suede',
  brand: {
    id: generateUUID(),
    name: 'nike'
  }
}

export const sneakerByIdMockRequest: SuccessResponse<SneakerDto> = {
  data: sneakerMock,
  code: 200,
  error: null
}
