import { CollectionConfig } from 'payload/types'
import { contentAccess } from '@/payload/access/contentAccess'
import { slug } from '@/payload/fields/slug'

export const COLLECTION_SLUG_UNIT = 'unit'

export const Unit: CollectionConfig = {
  slug: COLLECTION_SLUG_UNIT,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'leadership', 'type', 'category', 'updatedAt'],
    group: 'Database',
  },
  access: contentAccess,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              hasMany: true,
              relationTo: 'unit-tag',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'leadership',
                  type: 'number',
                  required: true,
                  max: 500,
                  min: 0,
                  admin: {
                    step: 5,
                  },
                },
                {
                  name: 'stars',
                  type: 'number',
                  required: true,
                  min: 0.5,
                  max: 5,
                  admin: {
                    step: 0.5,
                  },
                },
                {
                  name: 'maxLevel',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 30,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'relationship',
                  relationTo: 'unit-type',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'unit-category',
                  required: true,
                },
                {
                  name: 'era',
                  type: 'relationship',
                  relationTo: 'unit-era',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'mastery',
          fields: [
            {
              type: 'checkbox',
              name: 'hasMastery',
            },
            {
              name: 'nodes',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData.hasMastery,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'richText',
                },
              ],
            },
          ],
        },
        {
          name: 'attributes',
          fields: [
            {
              type: 'collapsible',
              label: 'Basic Attributes',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'health',
                      type: 'number',
                    },
                    {
                      name: 'strength',
                      type: 'number',
                    },
                    {
                      name: 'speed',
                      type: 'number',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'range',
                      type: 'number',
                    },
                    {
                      name: 'ammo',
                      type: 'number',
                    },
                    {
                      name: 'labour',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Attack Attributes',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'piercingArmourPenetration',
                      type: 'number',
                    },
                    {
                      name: 'slashingArmourPenetration',
                      type: 'number',
                    },
                    {
                      name: 'bluntArmourPenetration',
                      type: 'number',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'piercingDamage',
                      type: 'number',
                    },
                    {
                      name: 'slashingDamage',
                      type: 'number',
                    },
                    {
                      name: 'bluntDamage',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Defence Attributes',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'piercingDefence',
                      type: 'number',
                    },
                    {
                      name: 'slashingDefence',
                      type: 'number',
                    },
                    {
                      name: 'bluntDefence',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    slug('name'),
  ],
}
