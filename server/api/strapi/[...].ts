import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const proxyUrl = useRuntimeConfig().public.strapiBase
  const target = joinURL(proxyUrl, event.path.replace('/strapi', ''))
  return proxyRequest(event, target)
})
