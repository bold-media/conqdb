import { lexicalTextEditor } from '@/payload/fields/lexicalTextEditor'
import { LexicalBlock, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload/types'

export const BLOCK_SLUG_LOGIN = 'login'

/**
 * must include editor field, or the world will end
 */
export const LoginModule: LexicalBlock = {
  slug: BLOCK_SLUG_LOGIN,
  interfaceName: 'LoginModule',
  dbName: 'module_login',
  labels: {
    singular: 'Login Module',
    plural: 'Login Modules',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'richText',
      localized: true,
      editor: lexicalTextEditor,
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
      editor: lexicalTextEditor,
    },
    {
      name: 'security',
      type: 'richText',
      localized: true,
      editor: lexicalTextEditor,
    },
  ],
}
