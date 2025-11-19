import type { SuccessResponse } from '~/src/shared/api/types/responses'
import type { SlideDto } from '~/src/shared/api/slider/types'
// import { api } from '~/src/shared/api/instance'
import { mockRequest } from '~/src/shared/lib/mock/mock-request'
import { mainPageSlidesResponse } from '~/src/shared/api/slider/mock/get-main-slides'

export interface SliderApiType {
  GetMainPageSlides: {
    Response: SuccessResponse<SlideDto[]>
  }
}

export const sliderApi = {
  async getMainPageSlides () {
    // Real:

    // return await api.$get<SliderApiType.GetMainPageSlides.Response>('/slider/main')

    // Mock:

    await mockRequest()
    return mainPageSlidesResponse
  }
}
