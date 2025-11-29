<script setup lang="ts">
const props = defineProps<{
  from: 'login' | 'register'
}>()

const emit = defineEmits<{(e: 'register' | 'login'): void }>()

const description = computed(() => {
  if (props.from === 'login') {
    return 'Вы здесь впервые?'
  }

  return 'У вас уже есть аккаунт?'
})

const buttonText = computed(() => {
  if (props.from === 'login') {
    return 'Зарегистрироваться'
  }

  return 'Войти'
})
</script>

<template>
  <div class="flex flex-col items-center">
    <p>
      {{ description }}
    </p>
    <u-button variant="link" @click="from === 'login' ? emit('register') : emit('login')">
      {{ buttonText }}
    </u-button>
  </div>
</template>
