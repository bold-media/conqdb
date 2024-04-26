import { getUser } from '@/lib/auth'
import { UserMenuClient } from './UserMenuClient'
import { Layout } from 'payload-types'
import React from 'react'

interface UserMenuProps {
  data: Layout['header']['userMenu']
}

export const UserMenu: React.FC<UserMenuProps> = async ({ data }) => {
  const user = await getUser()

  return user ? <UserMenuClient user={user} data={data} /> : null
}
