import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import { FeatureProviderServer, lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { COLLECTION_SLUG_USER, User } from '@/payload/collections/user'
import { DiscordLoginButton } from '@/payload/components/DiscordLoginButton'
import { Profile } from '@/payload/collections/profile'
import { PayloadPluginNestedDocs } from '@/payload/plugins/PayloadPluginNestedDocs'
import { Page } from '@/payload/collections/page'
import { ProfileUnit } from '@/payload/collections/profile-unit'
import { Unit } from '@/payload/collections/unit'
import { UnitTag } from '@/payload/collections/unit-tag'
import { UnitType } from '@/payload/collections/unit-type'
import { UnitCategory } from '@/payload/collections/unit-category'
import { UnitEra } from '@/payload/collections/unit-era'
import { Weapon } from '@/payload/collections/weapon'
import { Media } from '@/payload/collections/media'
import { Template } from '@/payload/collections/template'
import { Settings } from '@/payload/globals/settings'
import { Layout } from '@/payload/globals/layout'
import { Translations } from '@/payload/globals/translations'
import { seed } from '@/payload/seed'
import { Module } from '@/payload/blocks/module'
import { PayloadStorageS3 } from '@/payload/plugins/PayloadStorageS3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: COLLECTION_SLUG_USER,
    components: {
      afterLogin: [DiscordLoginButton],
    },
  },
  collections: [
    /**
     * Content
     */
    Page,
    Template,
    /**
     * Database
     */
    Unit,
    UnitTag,
    UnitType,
    UnitCategory,
    UnitEra,
    Weapon,
    /**
     * Admin
     */
    Media,
    User,
    Profile,
    ProfileUnit,
  ],
  globals: [Layout, Translations, Settings],
  plugins: [PayloadStorageS3, PayloadPluginNestedDocs],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
        enabledCollections: ['page'],
      }) as FeatureProviderServer<unknown, unknown>,
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
    idType: 'uuid',
  }),
  i18n: {
    supportedLanguages: { en },
  },
  localization: {
    locales: [
      {
        label: 'العربية',
        code: 'ar',
        rtl: true,
      },
      {
        label: 'Čeština',
        code: 'cz',
      },
      {
        label: 'Deutsch',
        code: 'de',
      },
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Polski',
        code: 'pl',
      },
      {
        label: 'Русский',
        code: 'ru',
      },
      {
        label: 'Türkçe',
        code: 'tr',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  sharp,
  async onInit(payload) {
    if (process.env.SEED) {
      await seed(payload)
    }
  },
})
