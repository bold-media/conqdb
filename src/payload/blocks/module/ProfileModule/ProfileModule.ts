import { Block } from 'payload/types'
import ProfilePlaceholder from './ProfilePlaceholder'

export const BLOCK_SLUG_PROFILE = 'profile'

export const ProfileModule: Block = {
  slug: BLOCK_SLUG_PROFILE,
  interfaceName: 'ProfileModule',
  dbName: 'module_profile',
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
