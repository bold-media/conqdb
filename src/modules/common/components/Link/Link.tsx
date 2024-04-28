'use client'

import React from 'react'
import { Anchor } from '@mantine/core'
import { Link as NextLink } from '@/navigation'

import { PolymorphicComponentProps } from '@mantine/core'

type LinkProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  {
    href?: string
  }
>

export const Link: React.FC<LinkProps<typeof NextLink>> = ({ children, href, ...props }) => {
  return (
    <Anchor component={NextLink as any} href={href} {...props}>
      {children}
    </Anchor>
  )
}
