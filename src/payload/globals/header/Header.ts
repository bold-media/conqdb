import { contentAccess } from '@/payload/access/contentAccess'
import { GlobalConfig } from 'payload/types'

export const GLOBAL_SLUG_HEADER = 'header'

export const Header: GlobalConfig = {
  slug: GLOBAL_SLUG_HEADER,
  access: contentAccess,
  admin: {
    hidden: ({ user }) => !user?.roles?.some((role) => role === 'maintainer' || role === 'admin'),
    description: 'Navigation header of the site.',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [],
    },
  ],
}
