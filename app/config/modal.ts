import type { TVConfig } from '@nuxt/ui'
import type * as ui from '#build/ui'

export const modal: TVConfig<typeof ui>['modal'] = {
  slots: {
    content: 'p-6 divide-none flex flex-col gap-6'
  }
}
