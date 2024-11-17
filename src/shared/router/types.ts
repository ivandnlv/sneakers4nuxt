import type { RouteLocationNamedRaw } from '#vue-router'

export const enum AppRoutes {
    index = 'index',
    myPurchases = 'my-purchases',
    wishes = 'wishes'
}

export interface AppRoute extends RouteLocationNamedRaw {
    name: AppRoutes
}
