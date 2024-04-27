import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload/types'

export const BLOCK_SLUG_LOGIN = 'login'

/**
 * must include editor field, or the world will end
 */
export const LoginModule: Block = {
  slug: BLOCK_SLUG_LOGIN,
  interfaceName: 'LoginModule',
  dbName: 'module_login',
  fields: [
    {
      name: 'subtitle',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
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
      editor: lexicalEditor(),
    },
    {
      name: 'security',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
    },
  ],
}
