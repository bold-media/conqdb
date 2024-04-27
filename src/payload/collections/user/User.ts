import { CollectionConfig } from 'payload/types'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { rolesOrUser } from './access/rolesOrUser'
import { checkRole } from '../../access/checkRole'
import { COLLECTION_SLUG_PROFILE } from '../profile/Profile'

export const COLLECTION_SLUG_USER = 'user'

export const User: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  auth: true,
  admin: {
    useAsTitle: 'discordUsername',
    defaultColumns: ['discordUsername', 'roles', 'createdAt', 'updatedAt'],
    hidden: ({ user }) => !user?.roles?.includes('admin'),
    group: 'Admin',
  },
  access: {
    read: ({ req }) => rolesOrUser(['admin'], req.user),
    create: ({ req }) => checkRole(['admin'], req.user),
    update: ({ req }) => rolesOrUser(['admin'], req.user),
    delete: ({ req }) => checkRole(['admin'], req.user),
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['user'],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        update: ({ req }) => checkRole(['admin'], req.user),
        create: ({ req }) => checkRole(['admin'], req.user),
      },
      options: [
        {
          label: 'Banned',
          value: 'banned',
        },
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Member',
          value: 'member',
        },
        {
          label: 'Maintainer',
          value: 'maintainer',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_PROFILE,
      unique: true,
      index: true,
      saveToJWT: true,
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req }) => checkRole(['admin'], req.user),
        create: ({ req }) => checkRole(['admin'], req.user),
      },
    },
    {
      name: 'discordId',
      type: 'text',
      index: true,
      access: {
        update: ({ req }) => checkRole(['admin'], req.user),
        create: ({ req }) => checkRole(['admin'], req.user),
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'discordUsername',
      type: 'text',
      index: true,
      saveToJWT: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'discordDiscriminator',
      type: 'text',
      saveToJWT: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'discordAccessToken',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'discordRefreshToken',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        hidden: true,
      },
    },
    {
      name: 'discordAvatar',
      type: 'text',
      saveToJWT: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
