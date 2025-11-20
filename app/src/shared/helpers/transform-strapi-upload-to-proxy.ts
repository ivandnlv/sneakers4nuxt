// /uploads/... -> /api/strapi/uploads/...
export function transformStrapiUploadToProxy (uploadUrl: string): string {
  return `/api/strapi${uploadUrl}`
}
