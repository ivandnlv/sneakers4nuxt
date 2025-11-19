import type { SitemapRoute } from '~/src/shared/router/sitemap/types'
import { AppRoutes } from '~/src/shared/router/types'

const main: SitemapRoute = {
  name: 'Главная',
  route: {
    name: AppRoutes.index
  }
}

const myPurchases: SitemapRoute = {
  name: 'Мои покупки',
  route: {
    name: AppRoutes.myPurchases
  }
}

const wishes: SitemapRoute = {
  name: 'Избранное',
  route: {
    name: AppRoutes.wishes
  }
}

const sneakerDetail: SitemapRoute = {
  name: 'Детальная кроссовка',
  route: {
    name: AppRoutes.sneakerId
  }
}

export const SITEMAP = {
  main,
  myPurchases,
  wishes,
  sneakerDetail
}
