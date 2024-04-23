import { CollectionConfig } from 'payload/types'

export const COLLECTION_SLUG_PROFILE = 'profile'

export const Profile: CollectionConfig = {
  slug: COLLECTION_SLUG_PROFILE,
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'level', 'createdAt', 'updatedAt'],
    hidden: ({ user }) => !user?.roles?.includes('admin'),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'username',
              type: 'text',
              admin: {
                description: 'In-game character name',
              },
            },
            {
              name: 'level',
              type: 'number',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'lightLeadership',
                  type: 'number',
                  admin: {
                    description: 'For blue schematics',
                  },
                },
                {
                  name: 'mediumLeadership',
                  type: 'number',
                  admin: {
                    description: 'For blue schematics',
                  },
                },
                {
                  name: 'heavyLeadership',
                  type: 'number',
                  admin: {
                    description: 'For blue schematics',
                  },
                },
              ],
            },
            {
              name: 'weapons',
              type: 'array',
              fields: [
                // {
                //   name: "weapon",
                //   type: "relationship",
                //   relationTo: "weapon",
                //   required: true,
                // },
                {
                  name: 'leadership',
                  type: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    // {
    // 	name: "raid",
    // 	type: "relationship",
    // 	relationTo: "raid",
    // 	admin: {
    // 		position: "sidebar",
    // 	},
    // },
  ],
}
