import { getUser } from '@/lib/auth'
import { UserMenuClient } from './UserMenuClient'
import { Layout } from 'payload-types'
import React from 'react'
import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  UnstyledButton,
} from '@mantine/core'
import { IconUserCircle, IconUserPlus } from '@tabler/icons-react'
import { IconBell } from '@/modules/common/icons/IconBell'
import { MenuItemLink } from '@/modules/common/components/MenuItemLink'
import { IconUser } from '@/modules/common/icons/IconUser'
import { IconTableShare } from '@/modules/common/icons/IconTableShare'
import { checkRole } from '@/utils/checkRole'
import { IconLogout } from '@/modules/common/icons/IconLogout'
interface UserMenuProps {
  data: Layout['header']['userMenu']
}

export const UserMenu: React.FC<UserMenuProps> = async ({ data }) => {
  const user = await getUser()

  return user ? (
    <Menu>
      <MenuTarget>
        <UnstyledButton style={{ borderRadius: '50%' }}>
          <Avatar
            color="white"
            radius="xl"
            style={{ cursor: 'pointer' }}
            src={
              user?.discordAvatar
                ? `https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.discordAvatar}.png`
                : undefined
            }
          >
            {!user.discordAvatar ? <IconUserCircle size="30" strokeWidth={1.24} /> : null}
          </Avatar>
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem leftSection={<IconBell size="1rem" />}>
          {data?.notifications || 'Notifications'}
        </MenuItem>
        {typeof user?.profile === 'object' && user?.profile?.slug ? (
          <MenuItemLink
            href={`${data?.profile?.url}/${user?.profile?.slug}`}
            leftSection={<IconUser size="1rem" />}
          >
            {data?.profile?.label || 'Profile'}
          </MenuItemLink>
        ) : (
          <MenuItemLink
            href={data?.createProfile?.url || '/profile/create'}
            leftSection={<IconUserPlus size="1rem" />}
          >
            {data?.createProfile?.label || 'Create Profile'}
          </MenuItemLink>
        )}
        {checkRole(['maintainer'], user) && (
          <MenuItemLink
            href={data?.adminDashboard?.url || '/admin'}
            leftSection={<IconTableShare size="1rem" />}
          >
            {data?.adminDashboard?.label || 'Admin Dashboard'}
          </MenuItemLink>
        )}
        <MenuDivider />
        <MenuItemLink
          href={data?.logout?.url || '/logout'}
          leftSection={<IconLogout size="1rem" />}
          c="red"
        >
          {data?.logout?.label || 'Logout'}
        </MenuItemLink>
      </MenuDropdown>
    </Menu>
  ) : null
}
