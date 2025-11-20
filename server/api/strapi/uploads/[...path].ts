import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const proxyUrl = useRuntimeConfig().public.strapiBase
  const target = joinURL(proxyUrl, event.path.replace('/api/strapi', ''))
  return proxyRequest(event, target)
})
