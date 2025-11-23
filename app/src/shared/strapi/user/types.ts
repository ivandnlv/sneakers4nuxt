import type { StrapiEntityBase } from '~/src/shared/strapi/types'

export interface StrapiUserEntity extends Omit<StrapiEntityBase, 'name'>{
  username: string
  email: string
  provider: 'local'
  confirmed: boolean
  blocked: boolean
}
