import type { TVConfig } from '@nuxt/ui'
import type * as ui from '#build/ui'

export const card: TVConfig<typeof ui>['card'] = {
  slots: {
    root: 'rounded-xl'
  },
  variants: {
    variant: {
      outline: {
        root: 'bg-default !ring-none !divide-none border border-default'
      }
    }
  }
}
