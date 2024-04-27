import { AppShellHeader, Badge, Group } from '@mantine/core'
import React from 'react'
import { HeaderControls } from '../HeaderControls'
import { HeaderLogo } from './HeaderLogo'
import { Layout } from 'payload-types'

interface HeaderProps {
  data: Layout['header']
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <AppShellHeader px="md">
      <Group align="center" justify="space-between" h="100%">
        <Group gap="xl">
          <HeaderLogo />
          <Badge color="red" variant="light">
            Beta
          </Badge>
        </Group>
        <HeaderControls actions={data.actions} userMenu={data.userMenu} />
      </Group>
    </AppShellHeader>
  )
}
