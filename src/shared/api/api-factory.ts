import type { FetchConfig, FetchInstance } from '@refactorjs/ofetch'

export function apiFactory (instance: FetchInstance) {
  return {
    async $get<T = unknown> (url: string, config?: FetchConfig): Promise<T> {
      return await instance.$get(url, config)
    },

    async $post<T = unknown> (url: string, config?: FetchConfig): Promise<T> {
      return await instance.$post(url, config)
    },

    async $patch<T = unknown> (url: string, config?: FetchConfig): Promise<T> {
      return await instance.$patch(url, config)
    },

    async $put<T = unknown> (url: string, config?: FetchConfig): Promise<T> {
      return await instance.$put(url, config)
    },

    async $delete<T = unknown> (url: string, config?: FetchConfig): Promise<T> {
      return await instance.$delete(url, config)
    }
  }
}
