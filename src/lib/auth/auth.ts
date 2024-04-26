'use server'
import { cookies, headers } from 'next/headers'
import { redirect as nextRedirect } from 'next/navigation'
import { PAYLOAD_COOKIE_NAME } from './constants'
import { revalidatePath } from 'next/cache'
import { getPayload } from '@/lib/payload'
import { User } from 'payload-types'

export const signIn = (options?: { callbackUrl?: string; autoCallback?: boolean }) => {
  let { callbackUrl, autoCallback = true } = options ?? {}

  if (autoCallback && !callbackUrl) {
    callbackUrl = new URL(headers().get('Referer') || '/').pathname
  }

  nextRedirect(`/api/auth/discord?redirect=${encodeURIComponent(callbackUrl ?? '/profile')}`)
}

export const signOut = async (options?: { currentPath: string; redirectTo?: string }) => {
  cookies().delete(PAYLOAD_COOKIE_NAME)
  options?.currentPath && revalidatePath(options.currentPath)
  options?.redirectTo && nextRedirect(options.redirectTo)
}

export const getUser = async (): Promise<User | null> => {
  const payload = await getPayload()
  const h = headers()

  const { user } = await payload.auth({ headers: h })

  return user
}
