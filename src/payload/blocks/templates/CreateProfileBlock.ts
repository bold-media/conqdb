import { Block } from 'payload/types'

export const CreateProfileBlock: Block = {
  slug: 'createProfile',
  interfaceName: 'CreateProfileBlock',
  dbName: 'pages_blk_crProf',
  fields: [
    {
      name: 'features',
      type: 'array',
      dbName: 'pages_blk_crProf_feat',
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
