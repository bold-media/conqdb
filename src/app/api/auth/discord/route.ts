import { AUTH_REDIRECT_COOKIE_NAME } from '@/lib/auth/constants'
import { discord } from '@/lib/auth/discordConfig'
import { generateState } from 'arctic'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest): Promise<Response> => {
  const state = generateState()
  const url = await discord.createAuthorizationURL(state, {
    scopes: ['identify', 'guilds', 'guilds.members.read'],
  })

  const redirectUrl = req.nextUrl.searchParams.get('redirect')

  if (redirectUrl) {
    cookies().set(AUTH_REDIRECT_COOKIE_NAME, redirectUrl, {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 10, //10 minutes
      sameSite: 'lax',
    })
  } else if (req.nextUrl.pathname.startsWith('/admin')) {
    cookies().set(AUTH_REDIRECT_COOKIE_NAME, '/admin', {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 10, //10 minutes
      sameSite: 'lax',
    })
  }

  cookies().set('discord_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10, //10 minutes
    sameSite: 'lax',
  })

  return Response.redirect(url)
}
