import { sneakersApi } from '~/src/shared/api/sneakers'
import type { SneakerBrand } from '~/src/shared/api/sneakers/types'

export const useBrandsStore = defineStore('brands', () => {
  const { data, status } = useAsyncData('brands-data', fetchBrands, {
    default: () => [] as SneakerBrand[]
  })

  const pending = computed(() => status.value === 'pending')

  async function fetchBrands () {
    const { data } = await sneakersApi.getBrands()

    return data
  }

  return {
    data,
    pending
  }
})
