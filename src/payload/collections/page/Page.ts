import { fullTitle } from '@/payload/fields/fullTitle'
import { slug } from '@/payload/fields/slug'
import { populatePathname } from '@/payload/hooks/populatePathname'
import { CollectionConfig } from 'payload/types'
import { createParentField } from '@payloadcms/plugin-nested-docs'
import { checkRole } from '@/payload/access/checkRole'
import { Module } from '@/payload/blocks/module'
import {
  BlocksFeature,
  FeatureProviderServer,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { CreateProfileModule } from '@/payload/blocks/module/CreateProfileModule'
import { ProfileModule } from '@/payload/blocks/module/ProfileModule'
import { LoginModule } from '@/payload/blocks/module/LoginModule'
export const COLLECTION_SLUG_PAGE = 'page'

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
    {
      name: 'beforeTemplate',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.template,
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          BlocksFeature({
            blocks: [LoginModule, ProfileModule, CreateProfileModule],
          }) as FeatureProviderServer<unknown, unknown>,
          ...defaultFeatures,
          LinkFeature({
            enabledCollections: ['page'],
          }) as FeatureProviderServer<unknown, unknown>,
        ],
      }),
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          BlocksFeature({
            blocks: [LoginModule, ProfileModule, CreateProfileModule],
          }) as FeatureProviderServer<unknown, unknown>,
          ...defaultFeatures,
          LinkFeature({
            enabledCollections: ['page'],
          }) as FeatureProviderServer<unknown, unknown>,
        ],
      }),
    },
  ],
}
