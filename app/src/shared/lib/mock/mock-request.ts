import { promiseTimeout } from '@vueuse/core'

export function mockRequest (_?: unknown): Promise<void> {
  return promiseTimeout(500)
}
