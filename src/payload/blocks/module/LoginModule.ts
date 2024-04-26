import { Block } from 'payload/types'

export const BLOCK_SLUG_LOGIN = 'login'

export const LoginModule: Block = {
  slug: BLOCK_SLUG_LOGIN,
  interfaceName: 'LoginModule',
  fields: [
    {
      name: 'subtitle',
      type: 'richText',
      localized: true,
    },
    {
      name: 'loginWithDiscord',
      type: 'text',
      localized: true,
    },
    {
      name: 'privacyPolicy',
      type: 'richText',
      localized: true,
    },
    {
      name: 'security',
      type: 'richText',
      localized: true,
    },
  ],
}
