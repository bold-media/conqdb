'use client'
import React from 'react'
import { Link, usePathname } from '@/navigation'
import { Anchor } from '@mantine/core'

import classes from './LoginLink.module.css'
import cx from 'clsx'

export const LoginLinkClient = ({ label }: { label: string }) => {
  const pathname = usePathname()
  const active = pathname === '/login'

  return (
    <Anchor
      component={Link}
      href="/login"
      className={cx(classes.link, { [classes.linkActive]: active })}
      underline="never"
    >
      {label}
    </Anchor>
  )
}
