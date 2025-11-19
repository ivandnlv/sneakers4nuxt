// /uploads/... -> /api/uploads/...
export function transformUploadUrlToProxy (uploadUrl: string): string {
  return `/api${uploadUrl}`
}
