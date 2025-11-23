import { mockRequest } from '~/src/shared/helpers/mock/mock-request'

// const URL = '/cart'

export interface CartApi {
  CreateOrder: {
    Body: {
      sneakerIds: string[]
    }
  }
}

export const cartApi = {
  async toggleCart (_: string) {
    // await api.$patch(`${URL}/${id}`)
    await mockRequest()
  },

  async deleteFromCart (_: string) {
    // await api.$delete(`${URL}/${id}`)
    await mockRequest()
  },

  async createOrder (_: CartApi['CreateOrder']['Body']) {
    // await api.$post(`${URL}`, body)
    await mockRequest()
  }
}
