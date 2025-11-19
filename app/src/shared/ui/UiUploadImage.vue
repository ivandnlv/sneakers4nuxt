<script setup lang="ts">
import type { UploadEntity } from '~/src/shared/api/types'
import { transformUploadUrlToProxy } from '~/src/shared/helpers'

const props = defineProps<{
  upload: UploadEntity
}>()

const uploadUrlToProxy = computed(() => transformUploadUrlToProxy(props.upload.url))
</script>

<template>
  <img :src="uploadUrlToProxy">
</template>
