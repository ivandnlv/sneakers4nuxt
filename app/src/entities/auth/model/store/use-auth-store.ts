import type { AuthLoginModalProps } from '../../ui/AuthLoginModal.vue'
import type { StrapiUserEntity } from '~/src/shared/strapi/user/types'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { strapiAuthApi } from '~/src/shared/strapi/auth'
import type { StrapiAuthLogInDTO } from '~/src/shared/strapi/auth/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = useCookie<StrapiUserEntity | null>('auth-store:user', {
    default: () => null
  })

  const accessToken = useCookie<string | null>('auth-store:accessToken', {
    default: () => null
  })

  const refreshToken = useCookie<string | null>('auth-store:refreshToken', {
    default: () => null
  })

  const { runWithLoading: logIn, isLoading: isLoggingIn } = useTryCatchWithLoading(async (body: StrapiAuthLogInDTO) => {
    const response = await strapiAuthApi.logIn(body)

    user.value = response.user
    accessToken.value = response.jwt
    refreshToken.value = response.refreshToken
  })

  const isLoggedIn = computed(() => Boolean(user.value))

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
    user,
    accessToken,
    refreshToken,
    logIn,
    isLoggingIn,
    isLoggedIn,
    authFeaturesPromiseWrapper,
    openAuthModal: authModal.open
  }
})
