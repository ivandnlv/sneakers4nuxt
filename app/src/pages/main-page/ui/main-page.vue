<script setup lang="ts">
import MainPageSneakersSection from './SneakersSection/MainPageSneakersSection.vue'
import MainPageBanners from './MainPageBanners.vue'
import { SneakersSearch } from '~/src/features/sneakers/search'
import { SneakersFilter } from '~/src/features/sneakers/filter'
import { SneakersFilterResetBtn } from '~/src/features/sneakers/filters-reset'
import UiContainer from '~/src/shared/ui/UiContainer.vue'
import { sneakerModel } from '~/src/entities/sneaker'

const store = sneakerModel.useSneakersStrapiStore()
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
