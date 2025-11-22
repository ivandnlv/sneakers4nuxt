import type { EntitySelectBaseProps } from '~/src/shared/types/ui/select-entity'

export const useUiSelectEntity = <T extends EntitySelectBaseProps = EntitySelectBaseProps>(props: T) => {
  const propsToBase = computed(() => ({
    disabled: props.disabled || undefined,
    multiple: props.multiple || undefined,
    portal: props.portal || undefined,
    placeholder: props.placeholder || undefined,
    searchPlaceholder: props.searchPlaceholder || undefined,
    size: props.size || undefined,
    loadOnMount: props.loadOnMount || undefined,
    ui: props.ui || undefined,
    limit: props.limit || undefined,
    infiniteScroll: props.infiniteScroll || undefined
  }))

  return {
    propsToBase
  }
}
