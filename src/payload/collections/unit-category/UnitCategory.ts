import { contentAccess } from '@/payload/access/contentAccess'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_UNIT_CATEGORY = 'unit-category'

export const UnitCategory: CollectionConfig = {
  slug: COLLECTION_SLUG_UNIT_CATEGORY,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Database',
  },
  labels: {
    singular: 'Unit Category',
    plural: 'Unit Categories',
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
