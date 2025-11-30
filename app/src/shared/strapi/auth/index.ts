import type {
  StrapiAuthLogInDTO,
  StrapiAuthRefreshDTO,
  StrapiAuthRTO,
  StrapiAuthSignInDTO, StrapiAuthTokensRTO
} from '~/src/shared/strapi/auth/types'
import { strapi } from '~/src/shared/strapi/instance'

export interface StrapiAuthApiType {
  LogIn: {
    Request: StrapiAuthLogInDTO
    Response: StrapiAuthRTO
  },
  Register: {
    Request: StrapiAuthSignInDTO
    Response: StrapiAuthRTO
  },
  Refresh: {
    Request: StrapiAuthRefreshDTO
    Response: StrapiAuthTokensRTO
  }
}

export const strapiAuthApi = {
  async logIn (body: StrapiAuthApiType['LogIn']['Request']) {
    return await strapi.$post<StrapiAuthApiType['LogIn']['Response']>('/auth/local', {
      body
    })
  },

  async register (body: StrapiAuthApiType['Register']['Request']) {
    return await strapi.$post<StrapiAuthApiType['Register']['Response']>('/auth/local/register', {
      body
    })
  },

  async refresh (body: StrapiAuthApiType['Refresh']['Request']) {
    return await strapi.$post<StrapiAuthApiType['Refresh']['Response']>('/auth/refresh', {
      body
    })
  },

  async logout () {
    return await strapi.$post('/auth/logout')
  }
}
