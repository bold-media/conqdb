import { Group, rem, Skeleton, TooltipGroup } from '@mantine/core'
import React, { Suspense } from 'react'
import { LoginLink } from './LoginLink'
import { Profile } from './Profile'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

export const HeaderControls = async () => {
  return (
    <Group align="center" justify="center" gap={rem(12)}>
      {/* <Suspense>
        <LoginLink />
      </Suspense> */}
      <TooltipGroup openDelay={572} closeDelay={142}>
        <LanguageSwitcher label="Switch language" />
        <ThemeSwitcher label="Change Color Scheme" />
      </TooltipGroup>
      {/* <Suspense fallback={<Skeleton w={rem(38)} h={rem(38)} radius="xl" />}>
        <Profile />
      </Suspense> */}
    </Group>
  )
}
