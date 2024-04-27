import { fullTitle } from '@/payload/fields/fullTitle'
import { slug } from '@/payload/fields/slug'
import { populatePathname } from '@/payload/hooks/populatePathname'
import { Block, CollectionConfig, FieldWithRichTextRequiredEditor } from 'payload/types'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { checkRole } from '@/payload/access/checkRole'
import { Module } from '@/payload/blocks/module'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { LoginModule } from '@/payload/blocks/module/LoginModule'
import { ProfileModule } from '@/payload/blocks/module/ProfileModule'
import { CreateProfileModule } from '@/payload/blocks/module/CreateProfileModule'
export const COLLECTION_SLUG_PAGE = 'page'

export type LexicalBlock = Omit<Block, 'fields'> & {
  fields: FieldWithRichTextRequiredEditor[]
}

/**
 * just enable/reenable localization, mess around with it a bit
 * and you should see plenty of odd behavior.
 * Give it a little time; sadly, these errors don't present themselves right away,
 * but usually after making some more changes, or going to the frontend
 * and doing something like changing the locale (to fetch user profile again)
 * will kill the dev server and provide errors... of all sorts.
 */

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
      required: true,
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
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        /** @ts-ignore */
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              LoginModule as LexicalBlock,
              ProfileModule as LexicalBlock,
              CreateProfileModule as LexicalBlock,
            ],
          }),
        ],
      }),
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Module],
    },
  ],
}
