import type { SitemapRoute } from '~/src/shared/router/sitemap/types'
import { AppRoutes } from '~/src/shared/router/types'

const main: SitemapRoute = {
  name: 'Главная',
  route: {
    name: AppRoutes.index
  }
}

export const SITEMAP = {
  main
}
