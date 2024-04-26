import { checkRole } from '@/payload/access/checkRole'
import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_PROFILE_UNIT = 'profile-unit'

export const ProfileUnit: CollectionConfig = {
  slug: COLLECTION_SLUG_PROFILE_UNIT,
  admin: {
    useAsTitle: 'unit',
    defaultColumns: ['profile', 'unit', 'level', 'status', 'updatedAt'],
    group: 'Admin',
  },
  access: {
    read: ({ req }) => checkRole(['admin'], req.user),
    update: ({ req }) => checkRole(['admin'], req.user),
    delete: ({ req }) => checkRole(['admin'], req.user),
    create: ({ req }) => checkRole(['admin'], req.user),
  },
  fields: [
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profile',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'unit',
      type: 'relationship',
      relationTo: 'unit',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'number',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Training',
              value: 'training',
            },
            {
              label: 'Ready',
              value: 'ready',
            },
            {
              label: 'Maxed',
              value: 'maxed',
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'unlockedMasteryNodes',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'favorite',
          type: 'checkbox',
          admin: {
            width: '50%',
            style: {
              marginTop: '31px',
              alignSelf: 'center',
              justifySelf: 'center',
            },
          },
        },
      ],
    },
  ],
}
