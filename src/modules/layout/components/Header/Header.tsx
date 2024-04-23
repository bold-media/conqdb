import { AppShellHeader, Group } from '@mantine/core'
import React from 'react'
import { HeaderControls } from '../HeaderControls'
import { HeaderLogo } from './HeaderLogo'

export const Header = () => {
  return (
    <AppShellHeader px="md">
      <Group align="center" justify="space-between" h="100%">
        <Group gap="xl">
          <HeaderLogo />
        </Group>
        <HeaderControls />
      </Group>
    </AppShellHeader>
  )
}
