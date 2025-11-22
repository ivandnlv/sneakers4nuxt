<script setup lang="ts">
import MainPageSneakersSection from './SneakersSection/MainPageSneakersSection.vue'
import SneakersSearch from '~/src/features/sneakers/search/ui/SneakersSearch.vue'
import SneakersFilter from '~/src/features/sneakers/filter/ui/SneakersFilter.vue'
import SneakersFilterResetBtn from '~/src/features/sneakers/filters-reset/ui/SneakersFilterResetBtn.vue'

import UiContainer from '~/src/shared/ui/UiContainer.vue'

import MainPageBanners from '~/src/pages/main-page/ui/MainPageBanners.vue'
import { useSneakersStrapiStore } from '~/src/entities/sneaker/model/store/sneakers-strapi-store'

const store = useSneakersStrapiStore()
const { data, pending } = storeToRefs(store)
</script>

<template>
  <UiContainer class="mt-6">
    <MainPageBanners />

    <h1 class="mt-6 text-xl font-semibold">
      Каталог кроссовок
    </h1>
    <div class="grid grid-cols-[1fr_320px] gap-6 mt-6">
      <MainPageSneakersSection :sneakers="data" :pending="pending" />

      <ClientOnly>
        <div class="flex flex-col gap-4">
          <SneakersSearch />
          <SneakersFilter class="w-full">
            <template #trailing>
              <SneakersFilterResetBtn block />
            </template>
          </SneakersFilter>
        </div>

        <template #fallback>
          <div class="flex flex-col gap-4 w-full rounded-md">
            <USkeleton class="w-full h-10" />

            <USkeleton class="w-full h-[180px] rounded-xl" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </UiContainer>
</template>
