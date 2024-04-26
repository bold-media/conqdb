import { CollectionConfig } from 'payload/types'
import { updatePages } from './updatePages'
import { contentAccess } from '@/payload/access/contentAccess'

export const COLLECTION_SLUG_TEMPLATE = 'template'

export const Template: CollectionConfig = {
  slug: COLLECTION_SLUG_TEMPLATE,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Content',
  },
  hooks: {
    // afterChange: [updatePages],
  },
  versions: {
    maxPerDoc: 25,
    drafts: true,
  },
  access: contentAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description:
          "This is only used to identify the template. It's not shown anywhere on the website.",
      },
    },
    // {
    //   name: 'template',
    //   type: 'blocks',
    //   maxRows: 1,
    //   admin: {
    //     initCollapsed: false,
    //   },
    //   blocks: [],
    // },
  ],
}
