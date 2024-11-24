import type { SlideDto } from '~/src/shared/api/slider/types'
import { createMockEntityBase } from '~/src/shared/lib/mock/create-mock-entity-base'
import type { SuccessResponse } from '~/src/shared/api/types/responses'

const mainPageSlides: SlideDto[] = [
  {
    ...createMockEntityBase('image'),
    img: 'https://i.imgur.com/rj6tXBs.png',
    sortIndex: 1
  },
  {
    ...createMockEntityBase('image-2'),
    img: 'https://i.imgur.com/Ze3vSvM.png',
    sortIndex: 2
  }]

export const mainPageSlidesResponse: SuccessResponse<SlideDto[]> = {
  data: mainPageSlides,
  code: 200,
  error: null
}
