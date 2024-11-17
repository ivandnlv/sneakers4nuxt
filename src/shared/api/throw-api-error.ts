import type { FetchResponse } from 'ofetch'
import type { ErrorResponse } from '~/src/shared/api/types/responses'

interface FetchError {
  data: ErrorResponse
  response: FetchResponse<ErrorResponse>
}

export function throwApiError (error: FetchError) {
  let message = error.data?.message

  if (Array.isArray(message)) {
    message = message.join('. ')
  } else if (!message) {
    message = error.data?.error
  }

  throw new Error(message || 'Oops...')
}
