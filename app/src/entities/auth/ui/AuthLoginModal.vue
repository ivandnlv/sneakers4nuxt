<script setup lang="ts">
import { object } from 'yup'
import type { StrapiAuthLogInDTO } from '~/src/shared/strapi/auth/types'
import { appValidator } from '~/src/shared/helpers/validate'
import { authModel } from '~/src/entities/auth'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Авторизоваться на платформе'
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
const { isLoggingIn } = storeToRefs(authStore)
</script>

<template>
  <UModal
    title="Авторизоваться"
  >
    <template #content>
      <span class="text-xl">{{ title }}</span>

      <UForm
        class="flex flex-col gap-6"
        :state="state"
        :schema="schema"
        @submit="() => authStore.logIn(state)"
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
