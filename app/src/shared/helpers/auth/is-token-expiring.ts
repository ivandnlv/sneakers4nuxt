import { jwtDecode, type JwtPayload } from 'jwt-decode'

export function isTokenExpiring (token: string): boolean {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token)
    const exp = decodedToken.exp ?? 0
    const currentTime = Math.floor(Date.now() / 1000)
    return exp - currentTime < 10 * 60 // 10 минут (с запасом)
  } catch (_e: unknown) {
    return true
  }
}
