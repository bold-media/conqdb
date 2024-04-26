import { Block } from 'payload/types'

export const BLOCK_SLUG_CREATE_PROFILE = 'create-profile'

export const CreateProfileModule: Block = {
  slug: BLOCK_SLUG_CREATE_PROFILE,
  interfaceName: 'CreateProfileModule',
  fields: [
    {
      name: 'features',
      type: 'array',
      maxRows: 2,
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
