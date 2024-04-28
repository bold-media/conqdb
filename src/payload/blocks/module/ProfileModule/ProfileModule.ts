import { Block } from 'payload/types'
import ProfilePlaceholder from './ProfilePlaceholder'
import { LexicalBlock } from '@payloadcms/richtext-lexical'

export const BLOCK_SLUG_PROFILE = 'profile'

export const ProfileModule: LexicalBlock = {
  slug: BLOCK_SLUG_PROFILE,
  interfaceName: 'ProfileModule',
  dbName: 'module_profile',
  labels: {
    singular: 'Profile Module',
    plural: 'Profile Modules',
  },
  fields: [
    {
      name: 'placeholder',
      type: 'ui',
      admin: {
        components: {
          Field: ProfilePlaceholder,
        },
      },
    },
  ],
}
