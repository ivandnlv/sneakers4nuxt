import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

export const useCartStore = defineStore('cart-store', () => {
  const cart = ref<SneakerMinDto[]>([])

  const addToCart = (sneaker: SneakerMinDto) => {
    cart.value.push(sneaker)
  }

  const removeFromCart = (sneaker: SneakerMinDto) => {
    cart.value = cart.value.filter(item => item.id !== sneaker.id)
  }

  return {
    cart,
    addToCart,
    removeFromCart
  }
})
