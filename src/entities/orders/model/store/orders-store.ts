import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<SneakerMinDto[]>([])

  const setOrders = (sneakers: SneakerMinDto[]) => {
    orders.value = sneakers
  }

  const finalPrice = computed(() => {
    return orders.value.map(item => item.price).reduce((a, b) => a + b)
  })

  return {
    orders,
    setOrders,
    finalPrice
  }
})
