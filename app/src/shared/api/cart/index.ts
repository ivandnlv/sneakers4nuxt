import type { UUID } from 'node:crypto'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'

// const URL = '/cart'

export interface CartApi {
  CreateOrder: {
    Body: {
      sneakerIds: UUID[]
    }
  }
}

export const cartApi = {
  async toggleCart (_: UUID) {
    // await api.$patch(`${URL}/${id}`)
    await mockRequest()
  },

  async deleteFromCart (_: UUID) {
    // await api.$delete(`${URL}/${id}`)
    await mockRequest()
  },

  async createOrder (_: CartApi['CreateOrder']['Body']) {
    // await api.$post(`${URL}`, body)
    await mockRequest()
  }
}
