import { contentAccess } from '@/payload/access/contentAccess'
import { RowLabel } from './components/RowLabel'
import { link } from '@/payload/fields/link'
import { linkGroup } from '@/payload/fields/link'
import { GlobalConfig } from 'payload/types'
import { checkRole } from '@/payload/access/checkRole'

export const GLOBAL_SLUG_LAYOUT = 'layout'

export const Layout: GlobalConfig = {
  slug: GLOBAL_SLUG_LAYOUT,
  access: {
    read: contentAccess?.read,
    update: contentAccess?.update,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'header',
          fields: [
            {
              name: 'links',
              type: 'array',
              dbName: 'header_links',
              interfaceName: 'HeaderLinks',
              admin: {
                components: {
                  RowLabel: RowLabel,
                },
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  defaultValue: 'link',
                  required: true,
                  options: [
                    {
                      label: 'Link',
                      value: 'link',
                    },
                    {
                      label: 'Dropdown',
                      value: 'dropdown',
                    },
                    {
                      label: 'Dropdown with Link',
                      value: 'dropdownWithLink',
                    },
                  ],
                },
                link({
                  appearances: false,
                  overrides: {
                    admin: {
                      condition: (_, siblingData) =>
                        siblingData?.type === 'link' || siblingData?.type === 'dropdownWithLink',
                    },
                  },
                }),
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.type === 'dropdown',
                  },
                },
                linkGroup({
                  appearances: false,
                  overrides: {
                    admin: {
                      condition: (_, siblingData) =>
                        siblingData?.type === 'dropdown' ||
                        siblingData?.type === 'dropdownWithLink',
                    },
                  },
                }),
              ],
            },
            link({
              appearances: false,
              overrides: {
                name: 'login',
              },
            }),
            {
              name: 'actions',
              type: 'group',
              fields: [
                {
                  name: 'switchLanguage',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'toggleColorScheme',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'userMenu',
              type: 'group',
              fields: [
                {
                  name: 'notifications',
                  type: 'text',
                  localized: true,
                },

                link({
                  overrides: { name: 'profile' },
                  appearances: false,
                }),
                link({ overrides: { name: 'createProfile' }, appearances: false }),

                link({ overrides: { name: 'dashboard' }, appearances: false }),
                link({ overrides: { name: 'joinRaid' }, appearances: false }),

                link({ overrides: { name: 'createRaid' }, appearances: false }),
                link({ overrides: { name: 'groupBuilder' }, appearances: false }),

                link({ overrides: { name: 'adminDashboard' }, appearances: false }),
                link({ overrides: { name: 'logout' }, appearances: false }),
              ],
            },
          ],
        },
        {
          name: 'footer',
          fields: [
            {
              name: 'developedBy',
              type: 'text',
              localized: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'joinOurDiscord',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'joinDiscordLink',
                  type: 'text',
                  access: {
                    read: () => true,
                    update: ({ req }) => checkRole(['admin'], req.user),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
