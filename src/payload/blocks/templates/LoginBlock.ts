import { Block } from 'payload/types'

export const LoginBlock: Block = {
  slug: 'login',
  interfaceName: 'LoginBlock',
  dbName: 'pgs_blk_login',
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
