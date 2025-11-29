<script setup lang="ts">
import { object } from 'yup'
import { useAuthStore } from '../model/store/use-auth-store'
import type { StrapiAuthSignInDTO } from '~/src/shared/strapi/auth/types'
import { appValidator } from '~/src/shared/helpers/validate'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { strapiAuthApi } from '~/src/shared/strapi/auth'

export interface AuthRegistrationModalProps {
  title?: string
}

interface StrapiAuthSignInState extends StrapiAuthSignInDTO {
  passwordConfirm: string
}

withDefaults(defineProps<AuthRegistrationModalProps>(), {
  title: 'Регистрация'
})

const state = reactive<StrapiAuthSignInState>({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
})

const schema = object({
  email: appValidator.requiredEmail(),
  username: appValidator.required(),
  password: appValidator.requiredPassword(),
  passwordConfirm: appValidator.requiredPasswordConfirm(state.password)
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const { runWithLoading: register, isLoading: isRegisterLoading } = useTryCatchWithLoading(async () => {
  const response = await strapiAuthApi.register({
    email: state.email,
    password: state.password,
    username: state.username
  })

  authStore.setTokensByApi(response)

  user.value = response.user
})
</script>

<template>
  <UModal
    :title="title"
  >
    <template #content>
      <span class="text-xl" v-html="title" />

      <UForm
        class="flex flex-col gap-6"
        :state="state"
        :schema="schema"
        @submit="register()"
      >
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            class="w-full"
            placeholder="Введите email"
            type="email"
            size="xl"
          />
        </UFormField>

        <UFormField
          label="Пароль"
          name="password"
          required
        >
          <UInput
            v-model="state.password"
            class="w-full"
            size="xl"
            placeholder="Придумайте пароль"
            type="password"
          />
        </UFormField>

        <UFormField
          label="Подтверждение пароля"
          name="passwordConfirm"
          required
        >
          <UInput
            v-model="state.passwordConfirm"
            class="w-full"
            size="xl"
            placeholder="Подтвердите пароль"
            type="password"
          />
        </UFormField>

        <UButton
          size="xl"
          block
          type="submit"
          :loading="isRegisterLoading"
        >
          Зарегистрироваться
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
