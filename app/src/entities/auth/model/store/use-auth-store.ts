import type { AuthLoginModalProps } from '../../ui/AuthLoginModal.vue'
import type { StrapiUserEntity } from '~/src/shared/strapi/user/types'
import { AUTH_ACCESS_TOKEN_COOKIE_KEY, AUTH_REFRESH_TOKEN_COOKIE_KEY } from '~/src/shared/constants/auth'

export const useAuthStore = defineStore('auth-store', () => {
  const user = useCookie<StrapiUserEntity | null>('auth-store:user', {
    default: () => null
  })

  const accessToken = useCookie<string | null>(AUTH_ACCESS_TOKEN_COOKIE_KEY, {
    default: () => null
  })

  const refreshToken = useCookie<string | null>(AUTH_REFRESH_TOKEN_COOKIE_KEY, {
    default: () => null
  })

  function setTokensByApi ({ jwt, refreshToken: refreshTokenApi }: { jwt: string, refreshToken: string }) {
    accessToken.value = jwt
    refreshToken.value = refreshTokenApi
  }

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

  function resetUserData () {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
  }

  return {
    user,
    accessToken,
    refreshToken,
    setTokensByApi,
    isLoggedIn,
    authFeaturesPromiseWrapper,
    openAuthModal: authModal.open,
    resetUserData
  }
})
