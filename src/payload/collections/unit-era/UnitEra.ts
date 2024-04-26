import { contentAccess } from '@/payload/access/contentAccess'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_UNIT_ERA = 'unit-era'

export const UnitEra: CollectionConfig = {
  slug: COLLECTION_SLUG_UNIT_ERA,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Database',
  },
  access: contentAccess,
  defaultSort: 'weight',
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
