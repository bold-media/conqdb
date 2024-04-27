'use client'
import { Link } from '@/navigation'
import { MenuItem, MenuItemProps } from '@mantine/core'
import React from 'react'
import { UrlObject } from 'url'

interface MenuItemLinkProps extends MenuItemProps {
  href: string | UrlObject
}

export const MenuItemLink: React.FC<MenuItemLinkProps> = ({ href, children, ...rest }) => {
  return (
    <MenuItem component={Link} href={href} {...rest}>
      {children}
    </MenuItem>
  )
}
