<script setup lang="ts">
import type { UUID } from 'node:crypto'
import { useSneakerIdStore } from '~/src/entities/sneaker/model/store/sneaker-id-store'
import SneakerSlider from '~/src/entities/sneaker/ui/SneakerSlider.vue'
import SneakerInfo from '~/src/entities/sneaker/ui/SneakerInfo.vue'

const route = useRoute()
const id = route.params.id as UUID

const store = useSneakerIdStore(id)
const { data: sneakerData, pending } = storeToRefs(store)
</script>

<template>
  <span v-if="!sneakerData || pending">Loading..</span>

  <div v-else-if="sneakerData" class="flex flex-col mt-6">
    <h1 class="text-3xl font-semibold">
      {{ sneakerData.modelName }}
    </h1>

    <div class="grid grid-cols-2 gap-8 mt-4 rounded-[20px] p-5">
      <SneakerSlider :sneaker="sneakerData" />

      <SneakerInfo class="items-end" :sneaker="sneakerData" />
    </div>
  </div>
</template>
