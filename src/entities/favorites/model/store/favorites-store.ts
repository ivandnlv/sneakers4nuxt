import type { SneakerMinDto } from '~/src/shared/api/sneakers/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<SneakerMinDto[]>([])

  const addToFavorites = (sneaker: SneakerMinDto) => {
    favorites.value.push(sneaker)
  }

  const removeFromFavorites = (sneaker: SneakerMinDto) => {
    favorites.value = favorites.value.filter(item => item.id !== sneaker.id)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites
  }
})
