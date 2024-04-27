'use client'
import { Box } from '@mantine/core'
import { IconLogout as TablerIconLogout } from '@tabler/icons-react'
import { IconProps } from './Icon.types'
import classes from './Icon.module.css'
import cx from 'clsx'

export const IconLogout = ({
  size = '1.4rem',
  strokeWidth = 1.7,
  className,
  ...rest
}: IconProps) => (
  <Box
    component={TablerIconLogout}
    strokeWidth={strokeWidth}
    w={size}
    h={size}
    className={cx(classes.icon, className)}
    {...rest}
  />
)
