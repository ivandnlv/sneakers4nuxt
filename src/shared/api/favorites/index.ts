import type { UUID } from 'node:crypto'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'

const URL = '/wishes'

export const favoritesApi = {
  async toggleFavorites (_: UUID) {
    // await api.$patch(`${URL}/${id}`)f
    await mockRequest()
  },

  async deleteFromFavorites (_: UUID) {
    // await api.$delete(`${URL}/${id}`)
    await mockRequest()
  }
}
