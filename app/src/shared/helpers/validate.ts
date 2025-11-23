import { string } from 'yup'
import { VALIDATE_MESSAGES } from '~/src/shared/constants/validate/messages'

export const appValidator = {
  required,
  requiredEmail
}

function required () {
  return string().required(VALIDATE_MESSAGES.REQUIRED)
}

function requiredEmail () {
  return required().email(VALIDATE_MESSAGES.EMAIL)
}
