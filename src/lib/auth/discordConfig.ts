'server only'
import { fetchJson } from '@/utils/fetchJson'
import { Discord } from 'arctic'
import { User } from 'payload-types'

export const discord = new Discord(
  process.env.DISCORD_CLIENT_ID!,
  process.env.DISCORD_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/discord`,
)

export const discordConfig = {
  cookieName: 'discord_oauth_state',
  signInUrl: '/api/auth/discord',
  fetchUser: async (url: URL): Promise<{ user: User; discordId: string }> => {
    const code = url.searchParams.get('code')
    if (!code) throw new Error('Authorization code not found.')

    const { accessToken, refreshToken, accessTokenExpiresAt } =
      await discord.validateAuthorizationCode(code)

    const discordUser = await fetchJson('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      discordId: discordUser.id,
      /** @ts-ignore */
      user: {
        email: `${discordUser?.id}@discord.com`,
        discordId: discordUser?.id,
        discordUsername: discordUser?.username,
        discordDiscriminator: discordUser?.discriminator,
        discordAvatar: discordUser?.avatar,
        discordAccessToken: accessToken,
        discordRefreshToken: refreshToken,
      },
    }
  },
} as const
