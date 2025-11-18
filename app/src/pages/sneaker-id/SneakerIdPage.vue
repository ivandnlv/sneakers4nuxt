<script setup lang="ts">
import type { UUID } from 'node:crypto'
import { useSneakerIdStore } from '~/src/entities/sneaker/model/store/sneaker-id-store'
import SneakerSlider from '~/src/entities/sneaker/ui/SneakerSlider.vue'
import SneakerInfo from '~/src/entities/sneaker/ui/SneakerInfo.vue'
import AddToCartBtn from '~/src/features/cart/add-to-cart/ui/AddToCartBtn.vue'
import SneakerIdPageLoader from '~/src/pages/sneaker-id/SneakerIdPageLoader.vue'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'

const route = useRoute()
const id = route.params.id as UUID

const store = useSneakerIdStore(id)
const { data: sneakerData, pending } = storeToRefs(store)
</script>

<template>
  <SneakerIdPageLoader v-if="!sneakerData || pending" />

  <div v-else-if="sneakerData" class="flex flex-col mt-6">
    <div class="flex gap-3 items-center">
      <UButton
        color="neutral"
        size="xl"
        :icon="HeroIcons.ARROW_SMALL_LEFT"
        @click="$router.back()"
      />

      <h1 class="text-3xl font-semibold">
        {{ sneakerData.modelName }}
      </h1>
    </div>

    <div class="grid grid-cols-2 gap-8 mt-4 rounded-[20px] p-5">
      <client-only>
        <SneakerSlider :sneaker="sneakerData" />
      </client-only>

      <SneakerInfo :sneaker="sneakerData">
        <template #feature>
          <AddToCartBtn
            class="mt-6"
            block
            :sneaker="sneakerData"
            with-title
            :with-icon="false"
          />
        </template>
      </SneakerInfo>
    </div>
  </div>
</template>
