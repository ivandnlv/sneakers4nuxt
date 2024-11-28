import type { UUID } from 'node:crypto'
import { sneakersApi } from '~/src/shared/api/sneakers'

export const useSneakerIdStore = (id: UUID) => defineStore(`sneaker-${id}-store`, () => {
  const { data, status } = useAsyncData(`sneaker-${id}-data`, fetchSneaker)

  const pending = computed(() => status.value === 'pending')
  async function fetchSneaker () {
    const { data } = await sneakersApi.getById(id)

    return data
  }

  return {
    data,
    pending
  }
})()
