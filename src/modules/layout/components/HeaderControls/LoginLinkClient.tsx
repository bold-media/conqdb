'use client'
import React from 'react'
import { usePathname } from '@/navigation'
import { Anchor } from '@mantine/core'

import classes from './LoginLink.module.css'
import cx from 'clsx'
import { Link } from '@/modules/common/components/Link'

export const LoginLinkClient = ({ label }: { label: string }) => {
  const pathname = usePathname()
  const active = pathname === '/login'

  return (
    <Link
      href="/login"
      className={cx(classes.link, { [classes.linkActive]: active })}
      underline="never"
    >
      {label}
    </Link>
  )
}
