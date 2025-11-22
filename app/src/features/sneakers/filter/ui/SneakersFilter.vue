<script setup lang="ts">
import { BrandSelect } from '~/src/entities/brand'
import { sneakerModel } from '~/src/entities/sneaker'

const { filters } = storeToRefs(sneakerModel.useSneakersStrapiStore())
</script>

<template>
  <UCard
    class="w-full h-fit"
    :ui="{
      body: 'flex flex-col gap-6'
    }"
  >
    <UFormField label="Бренды">
      <BrandSelect
        v-model="filters.brands"
        class="w-full"
        :multiple="true"
      />
    </UFormField>

    <!--    <UCheckbox v-model="filters.withSale" label="Со скидкой" />-->

    <slot name="trailing" />
  </UCard>
</template>
