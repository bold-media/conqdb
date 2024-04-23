import { CollectionConfig } from 'payload/types'
import { checkRole } from './checkRole'

export const contentAccess: CollectionConfig['access'] = {
  create: ({ req }) => checkRole(['maintainer'], req.user),
  read: () => true,
  update: ({ req }) => checkRole(['maintainer'], req.user),
  delete: ({ req }) => checkRole(['admin'], req.user),
}
