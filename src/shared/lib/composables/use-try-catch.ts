export type UseTryCatchHandler<T> = (...args: any[]) => Promise<Awaited<T>>

export type UseTryCatchReturn<T extends UseTryCatchHandler<ReturnType<T>>> = (
  ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>

export function useTryCatch<T extends UseTryCatchHandler<ReturnType<T>>> (handler: T): UseTryCatchReturn<T> {
  return (async (...args: Parameters<typeof handler>) => {
    try {
      return await handler(...args)
    } catch (e: unknown) {
      if (isError(e)) {
        // useErrorNotification(e.message)
        console.log(e.message)
      }
    }
  }) as UseTryCatchReturn<T>
}
