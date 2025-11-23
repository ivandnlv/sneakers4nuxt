import type { StrapiEntitySelectBaseProps } from '~/src/shared/types/strapi'

export const useStrapiEntitySelectBase = <T extends StrapiEntitySelectBaseProps = StrapiEntitySelectBaseProps>(props: T) => {
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
