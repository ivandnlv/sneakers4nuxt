import type { TVConfig } from '@nuxt/ui'
import type * as ui from '#build/ui'

export const button: TVConfig<typeof ui>['button'] = {
  slots: {
    base: 'cursor-pointer'
  },
  compoundVariants: [
    {
      color: 'gray',
      variant: 'solid',
      class: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 aria-disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 dark:aria-disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center self-start'
    },
    {
      color: 'gray',
      variant: 'ghost',
      class: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-base gap-x-2.5 px-3.5 py-2.5 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-transparent disabled:bg-transparent aria-disabled:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent  inline-flex items-center self-start'
    }
  ]
}
