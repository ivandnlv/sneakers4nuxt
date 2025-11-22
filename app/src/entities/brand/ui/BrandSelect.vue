<script setup lang="ts">
import type {
  EntitySelectBaseProps,
  EntitySelectFetchList,
  EntitySelectFetchSelected
} from '~/src/shared/types/ui/select-entity'
import UiSelectEntityBase from '~/src/shared/ui/select/UiSelectEntityBase.vue'
import { strapiBrandsApi } from '~/src/shared/strapi/brands'
import { transformBaseEntityToSelectObject } from '~/src/shared/helpers/transform-base-entity-to-select-object'
import { useUiSelectEntity } from '~/src/shared/composables/ui/use-ui-select-entity'

const props = withDefaults(defineProps<EntitySelectBaseProps>(), {
  placeholder: 'Выберите бренд',
  searchPlaceholder: 'Поиск по названию'
})

const { propsToBase } = useUiSelectEntity(props)

const fetchList: EntitySelectFetchList = async (query) => {
  const { data, meta } = await strapiBrandsApi.getList(query)

  return {
    data: data.map(transformBaseEntityToSelectObject),
    meta
  }
}

const fetchSelected: EntitySelectFetchSelected = async (query) => {
  const { data } = await strapiBrandsApi.getList({
    ...query,
    'pagination[pageSize]': -1
  })

  return data.map(transformBaseEntityToSelectObject)
}
</script>

<template>
  <UiSelectEntityBase
    v-bind="propsToBase"
    :fetch-list-function="fetchList"
    :fetch-selected-function="fetchSelected"
  />
</template>
