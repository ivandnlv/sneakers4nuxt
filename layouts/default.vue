<script setup lang="ts">
import TheHeader from '~/src/widgets/the-header/ui/the-header.vue'
import Container from '~/src/shared/ui/Container.vue'
import AuthLoginButton from '~/src/features/auth/auth-login/ui/AuthLoginButton.vue'
import AuthRegisterButton from '~/src/features/auth/auth-register/ui/AuthRegisterButton.vue'
</script>

<template>
  <Container class="layout-container flex flex-col bg-white p-8 ">
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

<style lang="scss" scoped>
.layout-container {
  border-radius: 20px 20px 0 0;
  min-height: calc(100dvh - 90px);
}
</style>
