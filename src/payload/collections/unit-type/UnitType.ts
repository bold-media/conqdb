import { contentAccess } from '@/payload/access/contentAccess'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_UNIT_TYPE = 'unit-type'

export const UnitType: CollectionConfig = {
  slug: COLLECTION_SLUG_UNIT_TYPE,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Database',
  },
  defaultSort: 'weight',
  access: contentAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      name: 'weight',
      type: 'number',
    },
  ],
}
