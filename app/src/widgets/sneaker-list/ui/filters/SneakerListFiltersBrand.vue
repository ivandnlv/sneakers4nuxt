<script setup lang="ts">
import { StrapiEntitySelectBase, strapiModel } from '~/src/entities/strapi'
import type {
  StrapiEntitySelectBaseProps,
  StrapiEntitySelectFetchList,
  StrapiEntitySelectFetchSelected
} from '~/src/shared/types/strapi'
import { strapiBrandsApi } from '~/src/shared/strapi/brands'
import { transformBaseEntityToSelectObject } from '~/src/shared/helpers/transform-base-entity-to-select-object'

const props = withDefaults(defineProps<StrapiEntitySelectBaseProps>(), {
  placeholder: 'Выберите бренды',
  searchPlaceholder: 'Поиск по названию',
  infiniteScroll: true
})

const { propsToBase } = strapiModel.useStrapiEntitySelectBase(props)

const fetchList: StrapiEntitySelectFetchList = async (query) => {
  const { data, meta } = await strapiBrandsApi.getList(query)

  return {
    data: data.map(transformBaseEntityToSelectObject),
    meta
  }
}

const fetchSelected: StrapiEntitySelectFetchSelected = async (query) => {
  const { data } = await strapiBrandsApi.getList({
    ...query,
    'pagination[pageSize]': -1
  })

  return data.map(transformBaseEntityToSelectObject)
}
</script>

<template>
  <StrapiEntitySelectBase
    v-bind="propsToBase"
    :fetch-list-function="fetchList"
    :fetch-selected-function="fetchSelected"
  />
</template>
