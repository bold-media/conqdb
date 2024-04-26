import { checkRole } from '@/payload/access/checkRole'
import { GlobalConfig } from 'payload/types'

export const GLOBAL_SLUG_SETTINGS = 'settings'

export const Settings: GlobalConfig = {
  slug: GLOBAL_SLUG_SETTINGS,
  admin: {
    group: 'Admin',
    hidden: ({ user }) => !user?.roles?.includes('admin'),
  },
  access: {
    read: ({ req }) => checkRole(['admin'], req.user),
    update: ({ req }) => checkRole(['admin'], req.user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'pages',
          fields: [
            {
              type: 'group',
              name: 'units',
              label: 'All Units Page',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'defaultParentPage',
                      type: 'relationship',
                      relationTo: 'page',
                      hasMany: false,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'template',
                      type: 'relationship',
                      relationTo: 'template',
                      hasMany: false,
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'unit',
              label: 'Unit Page',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'defaultParentPage',
                      type: 'relationship',
                      relationTo: 'page',
                      hasMany: false,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'template',
                      type: 'relationship',
                      relationTo: 'template',
                      hasMany: false,
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
