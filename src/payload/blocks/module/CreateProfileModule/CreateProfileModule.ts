import { Block } from 'payload/types'
import { RowLabel } from './RowLabel'

export const BLOCK_SLUG_CREATE_PROFILE = 'create-profile'

export const CreateProfileModule: Block = {
  slug: BLOCK_SLUG_CREATE_PROFILE,
  interfaceName: 'CreateProfileModule',
  dbName: 'module_crProf',
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
