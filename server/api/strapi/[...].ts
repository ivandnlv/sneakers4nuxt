import { joinURL } from 'ufo'
import { AUTH_ACCESS_TOKEN_COOKIE_KEY, AUTH_REFRESH_TOKEN_COOKIE_KEY } from '~/src/shared/constants/auth'
import { isTokenExpiring } from '~/src/shared/helpers/auth/is-token-expiring'
import { serverTokenRefresh } from '~/src/shared/helpers/auth/server-token-refresh'

const defaultCookieOptions = {
  httpOnly: false,
  path: '/',
  secure: false
}

export default defineEventHandler(async (event) => {
  const accessTokenCookie = getCookie(event, AUTH_ACCESS_TOKEN_COOKIE_KEY)
  const refreshTokenCookie = getCookie(event, AUTH_REFRESH_TOKEN_COOKIE_KEY)

  if (!accessTokenCookie || !refreshTokenCookie) {
    const proxyUrl = useRuntimeConfig().public.strapiBase
    const target = joinURL(proxyUrl, event.path.replace('/strapi', ''))
    return proxyRequest(event, target)
  }

  let jwt: string | null = accessTokenCookie ?? null
  const isRefreshTokenExpiring = refreshTokenCookie ? isTokenExpiring(refreshTokenCookie) : true

  if (jwt && isTokenExpiring(jwt) && refreshTokenCookie && !isRefreshTokenExpiring) {
    const newTokens = await serverTokenRefresh(refreshTokenCookie)

    setCookie(event, AUTH_ACCESS_TOKEN_COOKIE_KEY, newTokens?.jwt ?? '', defaultCookieOptions)
    setCookie(event, AUTH_REFRESH_TOKEN_COOKIE_KEY, newTokens?.refreshToken ?? '', defaultCookieOptions)

    jwt = newTokens?.jwt ?? null
  } else if (isRefreshTokenExpiring) {
    jwt = null
  }

  const proxyUrl = useRuntimeConfig().public.strapiBase
  const target = joinURL(proxyUrl, event.path.replace('/strapi', ''))
  return proxyRequest(event, target, {
    headers: jwt
      ? {
          authorization: `Bearer ${jwt}`
        }
      : undefined
  })
})
