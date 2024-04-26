import { fullTitle } from '@/payload/fields/fullTitle'
import { slug } from '@/payload/fields/slug'
import { populatePathname } from '@/payload/hooks/populatePathname'
import { CollectionConfig } from 'payload/types'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { checkRole } from '@/payload/access/checkRole'
import { Module } from '@/payload/blocks/module'
export const COLLECTION_SLUG_PAGE = 'page'

export const Page: CollectionConfig = {
  slug: COLLECTION_SLUG_PAGE,
  hooks: {
    beforeChange: [populatePathname],
  },
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: ['fullTitle', 'slug', 'pathname', 'updatedAt'],
    group: 'Content',
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  access: {
    create: ({ req }) => checkRole(['maintainer'], req.user),
    read: () => true,
    update: ({ req }) => checkRole(['maintainer'], req.user),
    delete: ({ req }) => checkRole(['admin'], req.user),
    readVersions: ({ req }) => checkRole(['admin'], req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    fullTitle,
    slug(),
    {
      name: 'pathname',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    createParentField(COLLECTION_SLUG_PAGE),
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'template',
      admin: {
        position: 'sidebar',
      },
    },
    // {
    //   name: 'beforeTemplate',
    //   label: 'Before Template Blocks',
    //   labels: {
    //     singular: 'Block',
    //     plural: 'Blocks',
    //   },
    //   type: 'blocks',
    //   admin: {
    //     condition: (_, siblingData) => siblingData.template,
    //   },
    //   blocks: [],
    // },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Module],
    },
  ],
}
