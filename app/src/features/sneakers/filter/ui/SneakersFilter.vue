<script setup lang="ts">
import BrandSelect from '~/src/entities/brand/ui/BrandSelect.vue'

import { useSneakersStrapiStore } from '~/src/entities/sneaker/model/store/sneakers-strapi-store'

const { filters } = storeToRefs(useSneakersStrapiStore())
</script>

<template>
  <UCard
    class="w-full h-fit"
    :ui="{
      body: 'flex flex-col gap-6'
    }"
  >
    <UFormField label="Бренды">
      <BrandSelect v-model="filters['filters[brand][name][$eqi]']" class="w-full" :multiple="true" />
    </UFormField>

    <!--    <UCheckbox v-model="filters.withSale" label="Со скидкой" />-->

    <slot name="trailing" />
  </UCard>
</template>
