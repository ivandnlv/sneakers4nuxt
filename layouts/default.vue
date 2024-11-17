<script setup lang="ts">
import TheHeader from '~/src/widgets/the-header/ui/the-header.vue'
import Container from '~/src/shared/ui/Container.vue'
import AuthLoginButton from '~/src/features/auth/auth-login/ui/AuthLoginButton.vue'
import AuthRegisterButton from '~/src/features/auth/auth-register/ui/AuthRegisterButton.vue'
</script>

<template>
  <Container class="flex flex-col bg-white rounded-[20px] p-8 ">
    <TheHeader>
      <template #actions>
        <div class="flex gap-4 ml-auto">
          <AuthLoginButton />
          <AuthRegisterButton />
        </div>
      </template>
    </TheHeader>

    <slot />
  </Container>
</template>
