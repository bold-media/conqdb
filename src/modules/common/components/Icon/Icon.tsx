'use client'

import { Box, BoxProps } from '@mantine/core'
import React from 'react'
import classes from './Icon.module.css'
import cx from 'clsx'

interface IconProps extends BoxProps {
  icon: any
  size?: string | number
  strokeWidth?: number
}

export const Icon = ({ icon, size = '1.4rem', strokeWidth = 1.7, className }: IconProps) => {
  return (
    <Box
      component={icon}
      strokeWidth={strokeWidth}
      w={size}
      h={size}
      className={cx(classes.icon, className)}
    />
  )
}
