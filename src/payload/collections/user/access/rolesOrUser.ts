import { User } from 'payload-types'
import { PayloadRequest } from 'payload/types'
import { checkRole } from '../../../access/checkRole'

export const rolesOrUser = (roles: User['roles'], user: PayloadRequest['user']) => {
  if (user) {
    if (user?.roles?.includes('admin')) {
      return true
    }
    if (checkRole(roles, user)) {
      return true
    }

    return {
      id: {
        equals: user.id,
      },
    }
  }

  return false
}
