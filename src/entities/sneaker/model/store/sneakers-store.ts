import { useAsyncData } from '#app'
import { sneakersApi, type SneakersApiType } from '~/src/shared/api/sneakers'
import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

export const useSneakersStore = defineStore('sneakers', () => {
  const params = ref<SneakersApiType.GetList.Params>({})

  const { data: sneakersData, status } = useAsyncData('sneakers-data', fetchSneakers, {
    default: () => [] as SneakerMinDto[]
  })

  const pending = computed(() => status.value === 'pending')
  async function fetchSneakers () {
    const { data } = await sneakersApi.getList(params.value)

    return data.items
  }

  return {
    sneakersData,
    pending
  }
})
