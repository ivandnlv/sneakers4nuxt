<script setup lang="ts">
import { useStrapiPagination } from '../model/composables/use-strapi-pagination'
import type { StrapiEntitySelectProps } from '~/src/shared/types/strapi'
import type { SelectItemObject, SelectModelValue } from '~/src/shared/types/ui/select'
import { useTryCatchWithLoading } from '~/src/shared/composables/use-try-catch-with-loading'
import { useInfiniteScrollFetch } from '~/src/shared/composables/use-infinite-scroll-fetch'
import { ExternalIcons } from '~/src/shared/types/icons/external-icons'

const props = withDefaults(defineProps<StrapiEntitySelectProps>(), {
  size: 'lg',
  portal: true,
  searchPlaceholder: 'Поиск',
  limit: 10
})

const [isItemsInitialized, toggleItemsInitialized] = useToggle()

const selectedItems = ref<SelectItemObject[]>([])

const selectedItemsIds = computed(() => {
  return selectedItems.value.map(item => item.value)
})

const items = ref<SelectItemObject[]>([])

function addSelectItemInSelected (value: string) {
  if (selectedItemsIds.value.includes(value)) { return }

  const findInSelectItems = items.value.find(item => item.value === value)
  if (findInSelectItems) {
    selectedItems.value.push(findInSelectItems)
  }
}

function setItems (newItems: SelectItemObject[]) {
  items.value = newItems

  if (selectedItemsIds.value?.length) {
    items.value = items.value.filter(item => !selectedItemsIds.value.includes(item.value))
    items.value.unshift(...selectedItems.value)
  }
}

const model = defineModel<SelectModelValue>()
const searchModel = defineModel<string>('search', { default: '' })
const debouncedSearch = debouncedRef(searchModel, 500)

const { setMeta, isLastPage, setFirstPage, next, getPagePaginationQuery } = useStrapiPagination({
  limit: props.limit
})

const { runWithLoading: fetchItems, isLoading: itemsPending } = useTryCatchWithLoading(async () => {
  const { data, meta } = await props.fetchListFunction({
    ...getPagePaginationQuery(),
    'filters[name][$containsi]': searchModel.value
  })
  setItems(data)
  setMeta(meta.pagination)
})

const { runWithLoading: fetchMoreItems, isLoading: moreItemsPending } = useTryCatchWithLoading(async () => {
  next()
  const { data, meta } = await props.fetchListFunction({
    ...getPagePaginationQuery(),
    'filters[name][$containsi]': searchModel.value
  })
  setItems([...items.value, ...data])
  setMeta(meta.pagination)
})

const resetAndRefresh = () => {
  setFirstPage()
  fetchItems()
}

watch(debouncedSearch, resetAndRefresh)

const { runWithLoading: fetchSelected, isLoading: selectedPending } = useTryCatchWithLoading(async () => {
  if (!model.value) { return }

  selectedItems.value = await props.fetchSelectedFunction({
    'filters[documentId][$eq]': model.value
  })
  setItems(selectedItems.value)
})

const currentPending = computed(() => itemsPending.value || selectedPending.value || moreItemsPending.value)

const isClear = computed(() => {
  if (!model.value) { return true }

  if (Array.isArray(model.value)) {
    return model.value.length === 0
  }

  return false
})

const uniqueId = useId()
const VIEWPORT_CLASS = `ui-select-entity-base-${uniqueId}-viewport`

const targetElement = ref<HTMLElement | null>(null)

function setTargetElementByOpen (open: boolean) {
  if (!open) {
    targetElement.value = null
    return
  }

  nextTick(() => {
    targetElement.value = document.querySelector(`.${VIEWPORT_CLASS}`) ?? null
  })
}

async function initializeItemsOnUpdateOpen (value: boolean) {
  setTargetElementByOpen(value)
  if (isItemsInitialized.value || !value) { return }

  try {
    await fetchItems()
  } finally {
    toggleItemsInitialized(true)
  }
}

onMounted(() => {
  fetchSelected()

  if (props.loadOnMount) {
    initializeItemsOnUpdateOpen(true)
  }
})

const formattedModel = computed(() => {
  if (model.value && selectedPending.value) {
    return 'Загрузка...'
  }

  if (Array.isArray(model.value) && model.value.length > 1) {
    return `Выбрано элементов: ${model.value.length}`
  }

  const findInSelected = selectedItems.value.find((item) => {
    const modelValue = Array.isArray(model.value) ? model.value.at(0) : model.value

    return item.value === modelValue
  })

  if (!findInSelected) { return null }

  return findInSelected.label
})

const currentUi = computed(() => {
  const pendingClass = currentPending.value ? 'pl-4' : ''

  if (!props.ui) {
    return {
      placeholder: pendingClass,
      value: pendingClass,
      viewport: VIEWPORT_CLASS
    }
  }

  return {
    ...props.ui,
    placeholder: 'placeholder' in props.ui ? `${props.ui.placeholder} ${pendingClass}` : pendingClass,
    value: 'value' in props.ui ? `${props.ui.value} ${pendingClass}` : pendingClass,
    viewport: 'viewport' in props.ui ? `${props.ui.viewport} ${VIEWPORT_CLASS}` : VIEWPORT_CLASS
  }
})

if (props.infiniteScroll) {
  useInfiniteScrollFetch({
    targetElement,
    isLastPage,
    loadMoreCallback: async () => {
      const el = targetElement.value
      if (!el) { return }

      const prevScroll = el.scrollTop

      await fetchMoreItems()

      await nextTick(() => {
        el.scrollTop = prevScroll
      })
    }
  })
}

watch(model, (newVal) => {
  if (!newVal) {
    selectedItems.value = []
    return
  }

  if (Array.isArray(newVal)) {
    newVal.forEach(addSelectItemInSelected)

    return
  }

  addSelectItemInSelected(newVal)
})

defineExpose({
  resetAndRefresh
})

</script>

<template>
  <u-select-menu
    v-model="model"
    v-model:search-term="searchModel"
    :multiple="multiple"
    :search-input="{
      placeholder: searchPlaceholder,
      icon: 'i-lucide-search',
      size,
      modelModifiers: {
        trim: true
      }
    }"
    :portal="portal"
    :loading="currentPending"
    class="w-full !pr-18"
    :placeholder="placeholder"
    :items="items"
    :disabled="disabled"
    value-key="value"
    :size="size"
    :ui="currentUi"
    @click.stop="() => {}"
    @update:open="initializeItemsOnUpdateOpen"
  >
    <template #content-top>
      <slot name="content-top" />
    </template>

    <template
      v-if="currentPending"
      #empty
    >
      <u-icon
        class="size-6 mx-auto"
        :name="ExternalIcons.SVG_SPINNER"
      />
    </template>

    <template
      v-if="formattedModel"
      #default
    >
      <span :class="currentUi?.value">{{ formattedModel }}</span>
    </template>

    <template
      v-if="!isClear && !disabled"
      #trailing
    >
      <div class="flex items-center">
        <transition name="fade">
          <u-icon
            class="text-2xl"
            name="i-heroicons-x-mark-20-solid"
            @click.stop="model = undefined"
          />
        </transition>
      </div>
    </template>
  </u-select-menu>
</template>
