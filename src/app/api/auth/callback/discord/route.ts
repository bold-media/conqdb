import { getAuthResponseWithCookie } from '@/lib/auth/utils'

export const GET = async (request: Request): Promise<Response> => {
  return await getAuthResponseWithCookie(request.url)
}
