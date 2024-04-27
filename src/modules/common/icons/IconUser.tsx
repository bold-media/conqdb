'use client'
import { Box } from '@mantine/core'
import { IconUser as TablerIconUser } from '@tabler/icons-react'
import { IconProps } from './Icon.types'
import classes from './Icon.module.css'
import cx from 'clsx'

export const IconUser = ({ size = '1.4rem', strokeWidth = 1.7, className, ...rest }: IconProps) => (
  <Box
    component={TablerIconUser}
    strokeWidth={strokeWidth}
    w={size}
    h={size}
    className={cx(classes.icon, className)}
    {...rest}
  />
)
