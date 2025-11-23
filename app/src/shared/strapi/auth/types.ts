import type { StrapiUserEntity } from '~/src/shared/strapi/user/types'

export interface StrapiAuthLogInDTO {
  identifier: string
  password: string
}

export interface StrapiAuthSignInDTO {
  username: string
  email: string
  password: string
}

export interface StrapiAuthRefreshDTO {
  refreshToken: string
}

export interface StrapiAuthTokensRTO {
  jwt: string
  refreshToken: string
}

export interface StrapiAuthRTO extends StrapiAuthTokensRTO{
  user: StrapiUserEntity
}
