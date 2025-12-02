import type { AuthLoginModalProps } from '../../ui/AuthLoginModal.vue'

export const useAuthStore = defineStore('auth-store', () => {
  const { status, data } = useAuth()

  const isLoggedIn = computed(() => status.value === 'authenticated')

  const user = computed(() => data.value?.user ?? null)

  const overlay = useOverlay()
  const authModal = overlay.create(defineAsyncComponent(() => import('../../ui/AuthLoginModal.vue')))

  function authFeaturesPromiseWrapper<F extends (...args: any[]) => any>(
    fn: F,
    modalOptions?: AuthLoginModalProps
  ): (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>> | undefined> {
    return (...args: Parameters<F>) => {
      if (!isLoggedIn.value) {
        authModal.open(modalOptions)
        return Promise.resolve(undefined)
      }
      return Promise.resolve(fn(...args) as ReturnType<F>).then(r => r as Awaited<ReturnType<F>>)
    }
  }

  return {
    isLoggedIn,
    user,
    authFeaturesPromiseWrapper,
    openAuthModal: authModal.open
  }
})
