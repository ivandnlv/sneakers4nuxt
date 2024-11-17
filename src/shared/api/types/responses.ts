export interface BaseResponse {
  code: number
  message?: string[] | string
  error: null | string
}

export interface ErrorResponse extends BaseResponse {
  error: string
}

export interface SuccessResponse<T = unknown> extends BaseResponse {
  data: T
}
