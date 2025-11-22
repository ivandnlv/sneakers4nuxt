import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerBrand } from '~/src/shared/api/sneakers/types'

export const useBrandsStore = defineStore('brands', () => {
  async function fetchBrands () {
    const { data } = await sneakersApi.getBrands()

    return data
  }

  const { data, status } = useAsyncData('brands-data', fetchBrands, {
    default: () => [] as SneakerBrand[],
    server: false
  })

  const pending = computed(() => status.value === 'pending')

  return {
    data,
    pending
  }
})
