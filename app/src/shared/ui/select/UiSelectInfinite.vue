<script setup lang="ts">
import { useDebounceFn, useIntersectionObserver } from '@vueuse/core'
import type { SelectItem, SelectValue, SelectSearchResponse } from '~/src/shared/ui/select/types'
import UiSelectClearButton from '~/src/shared/ui/select/UiSelectClearButton.vue'
import { usePagination } from '~/src/shared/lib/composables/use-pagination'
import { useTryCatch } from '~/src/shared/lib/composables/use-try-catch'
import type { PagePaginationQuery, SearchQuery } from '~/src/shared/api/types'
// import { useErrorNotification } from '~/src/shared/lib/composables/use-notification'
import { HeroIcons } from '~/src/shared/types/icons/hero-icons'

const props = withDefaults(
  defineProps<{
    modelValue: SelectValue
    multiple?: boolean
    limit?: number
    options?: SelectItem[]
    page?: number
    getCallback:(params: PagePaginationQuery) => Promise<SelectSearchResponse>
    getBySearchCallback?: (params: PagePaginationQuery & SearchQuery) => Promise<SelectSearchResponse>
    loadOnMount?: boolean
    leadingIcon?: string
    trailingIcon?: string
    searchablePlaceholder?: string
    clearable?: boolean
    placeholder?: string
    searchable?: boolean
  }>(),
  {
    limit: 10,
    page: 1,
    leadingIcon: '',
    trailingIcon: HeroIcons.CHEVRON_DOWN_20_SOLID,
    searchablePlaceholder: 'Поиск',
    clearable: true,
    placeholder: ''
  }
)

const loading = ref(false)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectValue): void
}>()

const model = computed({
  get () {
    return props.modelValue
  },
  set (value: SelectValue) {
    emit('update:modelValue', value)
  }
})

const { getPagePaginationQuery, next, setTotal, setFirstPage, total } = usePagination({
  limit: props.limit,
  page: props.page
})

const resetPagination = () => {
  setFirstPage()
}

const resetOptions = () => {
  options.value = []
}

const resetSelected = () => {
  if (Array.isArray(model.value)) {
    model.value = []
  } else {
    model.value = undefined
  }
}

const resetState = () => {
  resetPagination()
  resetOptions()
  resume()
}

const options = ref<SelectItem[]>(props.options ?? [])
const optionsSearched = ref<SelectItem[]>([])

const target = ref<HTMLElement | null>(null)

const { pause, resume } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && !loading.value) {
    getAndSetOptions()
  }
})

const getAndSetOptions = useTryCatch(async () => {
  if (!total.value || options.value.length < total.value) {
    loading.value = true

    const response = await props.getCallback(getPagePaginationQuery())

    setTotal(response.pagination.totalItems)

    if (response.items.length) {
      options.value.push(...response.items)
    } else {
      pause()
    }

    loading.value = false
    next()
  } else {
    pause()
  }
})

const search = ref('')

const getOptionsBySearch = async () => {
  try {
    loading.value = true

    optionsSearched.value = []

    const params = {
      search: search.value,
      limit: props.limit,
      page: 1
    }

    const response = props.getBySearchCallback
      ? await props.getBySearchCallback(params)
      : await props.getCallback(params)

    if (response.items.length) {
      optionsSearched.value.push(...response.items)
    }

    loading.value = false
  } catch (e) {
    console.log(e)
    // if (e instanceof Error) {
    //   useErrorNotification(e.message)
    // } else {
    //   useErrorNotification('Произошла неизвестная ошибка')
    // }
  }
}

const debouncedSearch = useDebounceFn(getOptionsBySearch, 300)

watch(search, debouncedSearch)

defineExpose({
  resetOptions,
  resetPagination,
  resetState
})

onMounted(() => {
  if (props.loadOnMount) {
    getAndSetOptions()
  }
})
const lastOptionId = computed(() => options.value[options.value.length - 1]?.id ?? '')

const selectedValueTitle = computed<string>(() => {
  if (Array.isArray(model.value)) {
    return model.value?.length ? `Выбрано: ${model.value.length}` : ''
  }

  return model.value?.name ?? ''
})

const isSelected = computed<boolean>(() => {
  if (Array.isArray(model.value)) {
    return !!model.value.length
  }

  return !!model.value
})
</script>

<template>
  <USelectMenu
    v-model="model"
    v-model:query="search"
    :placeholder="placeholder"
    :multiple="multiple"
    :options="search ? optionsSearched : options"
    option-attribute="name"
    by="id"
    :leading-icon="leadingIcon"
    :trailing-icon="trailingIcon"
    :loading="loading"
    :searchable="searchable"
    :searchable-placeholder="searchablePlaceholder"
    :ui="{
      label: 'text-gray-400 dark:text-gray-400'
    }"
  >
    <template #label>
      <slot name="label" />
      <div
        v-if="clearable && isSelected"
        class="flex items-center w-full justify-between"
      >
        {{ selectedValueTitle }}

        <UiSelectClearButton @click.stop="resetSelected" />
      </div>
    </template>
    <template #option="{ option }">
      <span>{{ option.name }}</span>
      <div
        v-if="option.id === lastOptionId"
        ref="target"
      />
    </template>
    <template #option-empty>
      <slot name="option-empty" />
    </template>
    <template #empty>
      <slot name="empty" />
      <div ref="target" />
    </template>
  </USelectMenu>
</template>
