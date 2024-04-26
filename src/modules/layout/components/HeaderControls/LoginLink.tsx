import React from 'react'
import { getUser } from '@/lib/auth'
import { LoginLinkClient } from './LoginLinkClient'
import { User } from 'payload-types'

export const LoginLink = async () => {
  const user: User | null = await getUser()

  if (user) {
    return null
  }

  return <LoginLinkClient label="Login" />
}
