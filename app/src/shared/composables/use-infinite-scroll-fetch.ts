import { useIsLoading } from '~/src/shared/composables/use-is-loading'

export interface UseInfiniteScrollFetchOptions<T = void> {
  loadMoreCallback: (() => Promise<T | undefined>) | (() => Promise<Promise<void> | undefined>)
  targetElement?: Ref<HTMLElement | null>
  isLastPage: Ref<boolean>
}

export function useInfiniteScrollFetch (options: UseInfiniteScrollFetchOptions) {
  const { isLoading: isLoadingMore, finishLoading, startLoading } = useIsLoading()

  const target = computed(() => {
    if (options.targetElement?.value) {
      return options.targetElement.value
    }

    if (import.meta.client) {
      return window
    }

    return null
  })

  const handleScroll = async () => {
    if (!target.value || options.isLastPage.value || isLoadingMore.value) { return }

    let scrollTop: number, scrollHeight: number, clientHeight: number

    if (target.value === window) {
      scrollTop = window.scrollY || document.documentElement.scrollTop
      scrollHeight = document.documentElement.scrollHeight
      clientHeight = window.innerHeight
    } else {
      scrollTop = (target.value as HTMLElement).scrollTop
      scrollHeight = (target.value as HTMLElement).scrollHeight
      clientHeight = (target.value as HTMLElement).clientHeight
    }

    if (scrollHeight - scrollTop <= clientHeight + 10) {
      startLoading()
      if (options.loadMoreCallback) {
        await options.loadMoreCallback()
      }
      finishLoading()
    }
  }

  onMounted(() => {
    if (!target.value) { return }
    useEventListener(target, 'scroll', handleScroll)
  })

  return { isLoadingMore }
}
