import { checkRole } from '@/payload/access/checkRole'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_UNIT_TAG = 'unit-tag'

export const UnitTag: CollectionConfig = {
  slug: COLLECTION_SLUG_UNIT_TAG,
  admin: {
    hidden: true,
    useAsTitle: 'name',
  },
  access: {
    create: ({ req }) => checkRole(['maintainer'], req.user),
    read: () => true,
    update: ({ req }) => checkRole(['maintainer'], req.user),
    delete: ({ req }) => checkRole(['maintainer'], req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
