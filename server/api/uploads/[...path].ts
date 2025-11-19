import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const proxyUrl = useRuntimeConfig().public.s3Base
  const target = joinURL(proxyUrl, event.path.replace('/api', ''))
  return proxyRequest(event, target)
})
