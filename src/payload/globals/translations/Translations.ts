import { contentAccess } from '@/payload/access/contentAccess'
import { GlobalConfig } from 'payload/types'

export const GLOBAL_SLUG_TRANSLATIONS = 'translations'

export const Translations: GlobalConfig = {
  slug: GLOBAL_SLUG_TRANSLATIONS,
  admin: {
    group: 'Content',
  },
  access: {
    read: contentAccess?.read,
    update: contentAccess?.update,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'common',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'available',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'unavailable',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
