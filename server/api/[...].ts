import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const proxyUrl = useRuntimeConfig().public.apiBase
  const target = joinURL(proxyUrl, event.path)
  return proxyRequest(event, target)
})
