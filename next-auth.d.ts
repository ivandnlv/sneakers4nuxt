// file: ~/next-auth.d.ts
import type { DefaultSession } from 'next-auth'
import type { StrapiUserEntity } from '~/src/shared/strapi/user/types'

declare module 'next-auth' {
  /* Returned by `useAuth`, `getSession` and `getServerSession` */
  interface Session extends DefaultSession {
    user: StrapiUserEntity
  }
}
