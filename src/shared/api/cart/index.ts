import type { UUID } from 'node:crypto'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'

const URL = '/cart'

export namespace CartApi {

}

export const cartApi = {
  async toggleCart (_: UUID) {
    // await api.$patch(`${URL}/${id}`)
    await mockRequest()
  },

  async deleteFromCart (_: UUID) {
    // await api.$delete(`${URL}/${id}`)
  }
}
