'force dynamic'
import { Group, rem, Skeleton, TooltipGroup } from '@mantine/core'
import React, { Suspense } from 'react'
import { LoginLink } from './LoginLink'
import { UserMenu } from './UserMenu'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Layout } from 'payload-types'

interface HeaderControlsProps {
  actions: Layout['header']['actions']
  userMenu: Layout['header']['userMenu']
}

export const HeaderControls: React.FC<HeaderControlsProps> = async ({ actions, userMenu }) => {
  return (
    <Group align="center" justify="center" gap={rem(12)}>
      <Suspense fallback={<div></div>}>
        <LoginLink />
      </Suspense>
      <TooltipGroup openDelay={572} closeDelay={142}>
        <LanguageSwitcher label={actions?.switchLanguage || 'Switch Language'} />
        <ThemeSwitcher label={actions?.toggleColorScheme || 'Toggle Color Scheme'} />
      </TooltipGroup>
      <Suspense fallback={<Skeleton w={rem(38)} h={rem(38)} radius="xl" />}>
        <UserMenu data={userMenu} />
      </Suspense>
    </Group>
  )
}
