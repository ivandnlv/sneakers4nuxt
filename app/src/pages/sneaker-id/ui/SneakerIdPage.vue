<script setup lang="ts">
import SneakerIdPageLoader from './SneakerIdPageLoader.vue'
import { sneakerModel, SneakerSlider, SneakerInfo } from '~/src/entities/sneaker'
import { AddToCartBtn } from '~/src/features/cart/add-to-cart'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'

const route = useRoute()
const id = route.params.id as string

const store = sneakerModel.useSneakerIdStore(id)
const { data: sneakerData, pending } = storeToRefs(store)

const router = useRouter()
</script>

<template>
  <SneakerIdPageLoader v-if="!sneakerData || pending" />

  <div v-else-if="sneakerData" class="flex flex-col mt-6">
    <div class="flex gap-3 items-center">
      <UButton
        color="gray"
        size="xl"
        :icon="HeroIcons.ARROW_SMALL_LEFT"
        @click="router.back()"
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
