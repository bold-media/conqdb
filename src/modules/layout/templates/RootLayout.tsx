'use client'
import React from 'react'
import { MantineProvider } from '@mantine/core'
// import { ModalsProvider } from '@mantine/modals'
// import { Notifications } from '@mantine/notifications'
import { theme } from '@/styles/theme'
import { cssVariablesResolver } from '@/styles/cssVariablesResolver'

interface RootLayout {
  children: React.ReactNode
  font: {
    style: {
      fontFamily: string
    }
  }
}

export const RootLayout: React.FC<RootLayout> = ({ children, font }) => {
  return (
    <MantineProvider
      theme={{ ...theme, fontFamily: font.style.fontFamily }}
      cssVariablesResolver={cssVariablesResolver}
    >
      {/* <Notifications /> */}
      {/* <ModalsProvider> */}
      {children}
      {/* </ModalsProvider> */}
    </MantineProvider>
  )
}
