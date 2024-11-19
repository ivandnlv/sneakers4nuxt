<script setup lang="ts">
import Container from '~/src/shared/ui/Container.vue'
import SneakersList from '~/src/pages/main-page/ui/SneakersSection/SneakersList.vue'
import SneakersFilter from '~/src/features/sneakers/sneakers-filter/ui/SneakersFilter.vue'
import { useSneakersStore } from '~/src/entities/sneaker/model/store/sneakers-store'

const store = useSneakersStore()
const { currentPage, total } = storeToRefs(store)
</script>

<template>
  <Container class="mt-6">
    <h1 class="text-xl font-semibold">
      Каталог кроссовок
    </h1>
    <div class="grid grid-cols-[1fr_320px] gap-6 mt-6">
      <div class="flex flex-col gap-4">
        <SneakersList />
        <UPagination v-model="currentPage" :total="total" />
      </div>

      <SneakersFilter class="w-full" />
    </div>
  </Container>
</template>
