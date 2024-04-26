'use server'

import { getUser } from '@/lib/auth'
import { UserMenuClient } from './UserMenuClient'
import { Layout } from 'payload-types'
import React from 'react'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { headers } from 'next/headers'

interface UserMenuProps {
  data: Layout['header']['userMenu']
}

export const UserMenu: React.FC<UserMenuProps> = async ({ data }) => {
  const payload = await getPayload({ config: payloadConfig })
  const h = headers()

  const { user } = await payload.auth({ headers: h })
  // const user = await getUser()

  return user ? <UserMenuClient user={user} data={data} /> : null
}
