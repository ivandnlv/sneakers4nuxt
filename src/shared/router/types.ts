import type { RouteLocationNamedRaw } from '#vue-router'

export const enum AppRoutes {
    index = 'index'
}

export interface AppRoute extends RouteLocationNamedRaw {
    name: AppRoutes
}
