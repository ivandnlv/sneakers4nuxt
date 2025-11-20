import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  console.log('from proxy', event.path)
  const proxyUrl = useRuntimeConfig().public.strapiBase
  const target = joinURL(proxyUrl, event.path.replace('/strapi', ''))
  return proxyRequest(event, target)
})
