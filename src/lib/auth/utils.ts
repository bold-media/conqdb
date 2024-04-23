'server only'
import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_USER } from '@/payload/collections/user'
import configPromise from '@payload-config'
import { randomBytes } from 'crypto'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import type { Payload, SanitizedCollectionConfig } from 'payload/types'
import { getFieldsToSign, generatePayloadCookie } from 'payload/auth'
import { User } from 'payload-types'
import { discordConfig } from './discordConfig'
import { AUTH_REDIRECT_COOKIE_NAME } from './constants'

type UserIdentifier = {
  collectionSlug: string
} & ({ id: string } | { email: string } | { provider: string; discordId: string })

interface GeneratePayloadAuthCookieArgs {
  payload: Payload
  user: User
  userCollection: SanitizedCollectionConfig
}

export const generatePayloadAuthCookie = async ({
  payload,
  user,
  userCollection,
}: GeneratePayloadAuthCookieArgs) => {
  const fieldsToSign = getFieldsToSign({
    collectionConfig: userCollection,
    email: user.email,
    user: {
      ...user,
      /** @ts-ignore */
      collection: userCollection.slug,
    },
  })

  const now = Math.floor(Date.now() / 1000)

  const tokenExpiration =
    typeof userCollection?.auth?.tokenExpiration === 'number'
      ? userCollection.auth.tokenExpiration
      : 7200

  const expTime = now + tokenExpiration

  const token = await new SignJWT(fieldsToSign)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expTime)
    .sign(new TextEncoder().encode(payload.secret))

  const cookie = generatePayloadCookie({
    collectionConfig: userCollection,
    payload,
    token,
  })

  return cookie
}

export const findOrCreateUser = async (
  criteria: UserIdentifier,
  userData: User,
): Promise<{ user: User; payload: Payload } | null> => {
  const payload = await getPayload()

  let query = {}
  if ('id' in criteria) {
    query = { id: { equals: criteria.id } }
  } else if ('email' in criteria) {
    query = { email: { equals: criteria.email } }
  } else if ('provider' in criteria && 'discordId' in criteria) {
    query = {
      discordId: { equals: criteria.discordId },
    }
  }

  if (Object.values(query).length === 0) {
    throw new Error('No query provided.')
  }

  const { docs } = await payload.find({
    /** @ts-ignore */
    collection: criteria.collectionSlug,
    where: query,
  })

  let user = (docs?.at(0) as User) || null

  try {
    if (!user) {
      user = (await payload.create({
        /** @ts-ignore */
        collection: criteria.collectionSlug,
        data: {
          ...userData,
          /** @ts-ignore */
          password: randomBytes(32).toString('hex'),
        },
      })) as User
    } else {
      user = await payload.update({
        /** @ts-ignore */
        collection: criteria.collectionSlug as User['slug'],
        id: user.id,
        data: {
          ...userData,
        },
      })
    }
  } catch (error) {
    return null
  }

  return { user, payload }
}

export const getAuthResponseWithCookie = async (requestUrl: string) => {
  const url = new URL(requestUrl)
  const state = url.searchParams.get('state')
  const storedState = cookies().get(discordConfig.cookieName)?.value ?? null
  const redirectUrl = cookies().get(AUTH_REDIRECT_COOKIE_NAME)?.value ?? null

  if (redirectUrl) {
    cookies().delete(AUTH_REDIRECT_COOKIE_NAME)
  }

  if (!state || !storedState || state !== storedState) {
    return new Response(null, { status: 400, statusText: 'Invalid or missing auth state.' })
  }

  try {
    const { user: userData, discordId } = await discordConfig.fetchUser(url)

    const userResponse = await findOrCreateUser(
      {
        provider: 'discord',
        discordId: discordId,
        collectionSlug: COLLECTION_SLUG_USER,
      },
      userData,
    )

    if (!userResponse) return new Response('Error finding or creating user.', { status: 500 })

    const config = await configPromise

    const sanitizedUserCollectionConfig = config.collections.find(
      (c) => c.slug === COLLECTION_SLUG_USER,
    )

    if (!sanitizedUserCollectionConfig) {
      return new Response('Could not find user collection.', { status: 500 })
    }

    const { user, payload } = userResponse

    if (user) {
      const cookie = await generatePayloadAuthCookie({
        payload,
        user,
        userCollection: sanitizedUserCollectionConfig,
      })
      cookies().delete(discordConfig.cookieName)

      return new Response(null, {
        status: 302,
        headers: {
          Location: redirectUrl || '/',
          'Set-Cookie': cookie,
        },
      })
    }

    return new Response(null, { status: 302, headers: { Location: '/' } })
  } catch (error) {
    return new Response(null, { status: 500, statusText: 'OAuth process error.' })
  }
}
