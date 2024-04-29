'use client'

import React from 'react'
import { Anchor, AnchorProps } from '@mantine/core'
import { Link as NextLink } from '@/navigation'

import { PolymorphicComponentProps } from '@mantine/core'

type LinkProps = Omit<AnchorProps, 'href'> & { href: string; children: React.ReactNode }

type CombinedProps = LinkProps & AnchorProps

export const Link: React.FC<CombinedProps> = ({ children, href, ...props }) => {
  return (
    <Anchor component={NextLink as any} href={href} {...props}>
      {children}
    </Anchor>
  )
}
