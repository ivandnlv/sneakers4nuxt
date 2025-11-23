import { mockRequest } from '~/src/shared/helpers/mock/mock-request'

// const URL = '/wishes'

export const favoritesApi = {
  async toggleFavorites (_: string) {
    // await api.$patch(`${URL}/${id}`)f
    await mockRequest()
  },

  async deleteFromFavorites (_: string) {
    // await api.$delete(`${URL}/${id}`)
    await mockRequest()
  }
}
