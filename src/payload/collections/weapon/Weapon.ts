import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload/types'
import { contentAccess } from '@/payload/access/contentAccess'

export const COLLECTION_SLUG_WEAPON = 'weapon'

export const Weapon: CollectionConfig = {
  slug: COLLECTION_SLUG_WEAPON,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'updatedAt'],
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
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Light Armour',
          value: 'light',
        },
        {
          label: 'Medium Armour',
          value: 'medium',
        },
        {
          label: 'Heavy Armour',
          value: 'heavy',
        },
      ],
    },
    {
      name: 'weight',
      type: 'number',
    },
    slug('name'),
  ],
}
