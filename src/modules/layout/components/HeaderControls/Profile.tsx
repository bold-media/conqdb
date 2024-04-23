'use server'

import { getUser } from '@/lib/payload'
import { ProfileClient } from './ProfileClient'

export const Profile = async () => {
  const user = await getUser()

  return user ? <ProfileClient user={user} /> : null
}
