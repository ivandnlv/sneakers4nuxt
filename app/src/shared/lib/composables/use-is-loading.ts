export function useIsLoading (initValue = false) {
  const isLoading = ref(initValue)

  function startLoading () {
    isLoading.value = true
  }

  function finishLoading () {
    isLoading.value = false
  }

  return {
    isLoading,
    startLoading,
    finishLoading
  }
}
