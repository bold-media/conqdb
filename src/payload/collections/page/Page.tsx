import { CreateProfileBlock, LoginBlock, ProfileBlock } from '@/payload/blocks/templates'
import { fullTitle } from '@/payload/fields/fullTitle'
import { slug } from '@/payload/fields/slug'
import { populatePathname } from '@/payload/hooks/populatePathname'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_PAGE = 'page'

export const Page: CollectionConfig = {
  slug: COLLECTION_SLUG_PAGE,
  hooks: {
    beforeChange: [populatePathname],
  },
  admin: {
    useAsTitle: 'fullTitle',
    defaultColumns: ['fullTitle', 'slug', 'pathname', 'updatedAt'],
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
    // {
    //   name: 'template',
    //   type: 'blocks',
    //   maxRows: 1,
    //   blocks: [LoginBlock, ProfileBlock, CreateProfileBlock],
    // },
  ],
}
