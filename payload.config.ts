import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { User } from '@/payload/collections/user'
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
import { PayloadPluginCloudStorage } from '@/payload/plugins/PayloadPluginCloudStorage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      afterLogin: [DiscordLoginButton],
    },
  },
  collections: [
    User,
    Profile,
    Media,
    Page,
    ProfileUnit,
    Unit,
    UnitTag,
    UnitType,
    UnitCategory,
    UnitEra,
    Weapon,
  ],
  plugins: [
    PayloadPluginCloudStorage,
    // PayloadPluginNestedDocs
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
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
})
