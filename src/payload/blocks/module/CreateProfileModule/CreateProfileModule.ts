import { Block } from 'payload/types'
import { RowLabel } from './RowLabel'
import { LexicalBlock, lexicalEditor } from '@payloadcms/richtext-lexical'
import { lexicalTextEditor } from '@/payload/fields/lexicalTextEditor'

export const BLOCK_SLUG_CREATE_PROFILE = 'create-profile'

/**
 * richText must include the editor field, or the world will end
 */
export const CreateProfileModule: LexicalBlock = {
  slug: BLOCK_SLUG_CREATE_PROFILE,
  interfaceName: 'CreateProfileModule',
  dbName: 'module_crProf',
  labels: {
    singular: 'Create Profile Module',
    plural: 'Create Profile Modules',
  },
  fields: [
    {
      name: 'features',
      type: 'array',
      maxRows: 2,
      dbName: 'module_crProf_feat',
      admin: {
        components: {
          RowLabel: RowLabel,
        },
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'createAProfile',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'richText',
      localized: true,
      editor: lexicalTextEditor,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'usernameDescription',
          type: 'text',
          localized: true,
        },
        {
          name: 'slugDescription',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      localized: true,
    },
  ],
}
