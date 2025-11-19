<script setup lang="ts">
import Container from '~/src/shared/ui/Container.vue'
import SneakersList from '~/src/pages/main-page/ui/SneakersSection/SneakersList.vue'
import { useSneakersStore } from '~/src/entities/sneaker/model/store/sneakers-store'

import MainPageSlider from '~/src/pages/main-page/ui/MainPageSlider.vue'

const store = useSneakersStore()
const { currentPage, total } = storeToRefs(store)
</script>

<template>
  <Container class="mt-6">
    <MainPageSlider />

    <h1 class="mt-6 text-xl font-semibold">
      Каталог кроссовок
    </h1>
    <div class="flex gap-6 mt-6">
      <div class="flex flex-col gap-4">
        <SneakersList />
        <!--        <UPagination v-model="currentPage" :total="total" />-->
      </div>

      <!--      <client-only>-->
      <!--        <div class="flex flex-col gap-4">-->
      <!--          <SneakersSearch />-->
      <!--          <SneakersFilter class="w-full">-->
      <!--            <template #trailing>-->
      <!--              <SneakersFilterResetBtn block />-->
      <!--            </template>-->
      <!--          </SneakersFilter>-->
      <!--        </div>-->
      <!--      </client-only>-->
    </div>
  </Container>
</template>
