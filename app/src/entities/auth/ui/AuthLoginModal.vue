<script setup lang="ts">
import { object } from 'yup'
import type { StrapiAuthLogInDTO } from '~/src/shared/strapi/auth/types'
import { appValidator } from '~/src/shared/helpers/validate'
import { authModel } from '~/src/entities/auth'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { strapiAuthApi } from '~/src/shared/strapi/auth'

export interface AuthLoginModalProps {
  title?: string
}

withDefaults(defineProps<AuthLoginModalProps>(), {
  title: 'Авторизация'
})

const state = reactive<StrapiAuthLogInDTO>({
  identifier: '',
  password: ''
})

const schema = object({
  identifier: appValidator.requiredEmail(),
  password: appValidator.required()
})

const authStore = authModel.useAuthStore()
const { user } = storeToRefs(authStore)

const { runWithLoading: logIn, isLoading: isLoggingIn } = useTryCatchWithLoading(async () => {
  const response = await strapiAuthApi.logIn(state)

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
        @submit="logIn()"
      >
        <UFormField
          label="Email"
          name="email"
          required
        >
          <UInput
            v-model="state.identifier"
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
            placeholder="Введите пароль"
            type="password"
          />
        </UFormField>

        <UButton
          size="xl"
          block
          type="submit"
          :loading="isLoggingIn"
        >
          Войти
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
