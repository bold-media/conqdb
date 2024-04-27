'use client'
import { Box } from '@mantine/core'
import { IconBell as TablerIconBell } from '@tabler/icons-react'
import { IconProps } from './Icon.types'
import classes from './Icon.module.css'
import cx from 'clsx'

export const IconBell = ({ size = '1.4rem', strokeWidth = 1.7, className, ...rest }: IconProps) => (
  <Box
    component={TablerIconBell}
    strokeWidth={strokeWidth}
    w={size}
    h={size}
    className={cx(classes.icon, className)}
    {...rest}
  />
)
