<script setup lang="ts">
import { object } from 'yup'
import AuthModalSwitch from './AuthModalSwitch.vue'
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

const emit = defineEmits<{(e: 'close'): void }>()

const state = reactive<StrapiAuthLogInDTO>({
  identifier: '',
  password: ''
})

const schema = object({
  identifier: appValidator.requiredEmail(),
  password: appValidator.required()
})

const overlay = useOverlay()
const registerModal = overlay.create(defineAsyncComponent(() => import('./AuthRegistrationModal.vue')))

const authStore = authModel.useAuthStore()
const { user } = storeToRefs(authStore)

const { runWithLoading: logIn, isLoading: isLoggingIn } = useTryCatchWithLoading(async () => {
  const response = await strapiAuthApi.logIn(state)

  authStore.setTokensByApi(response)
  user.value = response.user

  emit('close')
})

const onSwitch = () => {
  emit('close')
  registerModal.open()
}
</script>

<template>
  <UModal
    :title="title"
    description="Авторизация"
  >
    <template #content>
      <h2 class="text-subtitle" v-html="title" />

      <UForm
        class="flex flex-col gap-6"
        :state="state"
        :schema="schema"
        :validate-on="['input', 'change']"
        @submit="logIn()"
      >
        <UFormField
          label="Email"
          name="identifier"
          required
        >
          <UInput
            v-model="state.identifier"
            class="w-full"
            placeholder="Введите email"
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

        <div class="flex flex-col gap-2">
          <UButton
            size="xl"
            block
            type="submit"
            :loading="isLoggingIn"
          >
            Войти
          </UButton>

          <AuthModalSwitch from="login" @register="onSwitch" />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
