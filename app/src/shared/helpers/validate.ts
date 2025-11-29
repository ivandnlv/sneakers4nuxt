import { string } from 'yup'
import { VALIDATE_MESSAGES } from '~/src/shared/constants/validate/messages'

export const appValidator = {
  required,
  requiredEmail,
  requiredPassword,
  requiredPasswordConfirm
}

function required () {
  return string().required(VALIDATE_MESSAGES.REQUIRED)
}

function requiredEmail () {
  return required().email(VALIDATE_MESSAGES.EMAIL)
}

function requiredPassword () {
  return required().min(6, VALIDATE_MESSAGES.PASSWORD_MIN_LENGTH_6).max(32, VALIDATE_MESSAGES.PASSWORD_MAX_LENGTH_32)
}

function requiredPasswordConfirm (password: Ref<string>) {
  return required().test('password-match-test', VALIDATE_MESSAGES.PASSWORD_MATCH, (value) => {
    return value === password.value
  })
}
