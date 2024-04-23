'use client'

import React from 'react'
import classes from './DiscordLoginButton.module.css'
import { DiscordIcon } from './DiscordIcon'
import { useSearchParams } from 'next/navigation'
import { signIn } from '@/lib/auth'

export const DiscordLoginButton = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || undefined

  return (
    <div className={classes.container}>
      {/* <a href={`/api/auth/discord${redirect ? `?redirect=${redirect}` : `?redirect=/admin`}`}> */}
      <button className={classes.discord} onClick={() => signIn({ callbackUrl: redirect })}>
        <div>
          <DiscordIcon size={20} />
          <span className={classes.discordText}>Sign in with Discord</span>
        </div>
      </button>
      {/* </a> */}
    </div>
  )
}
