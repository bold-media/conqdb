'use client'
import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import { Layout, User } from 'payload-types'
import React from 'react'
import { IconBell, IconLogout, IconUser, IconUserCircle } from '@tabler/icons-react'
import { Icon } from '@/modules/common/components/Icon'
import { signOut } from '@/lib/auth'
import { Link, usePathname } from '@/navigation'

interface ProfileClientProps {
  user: User
  data: Layout['header']['userMenu']
}

export const UserMenuClient: React.FC<ProfileClientProps> = ({ user, data }) => {
  const currentPath = usePathname()

  return (
    <Menu>
      <Menu.Target>
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
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon icon={IconBell} size="1rem" />}>
          {data?.notifications || 'Notifications'}
        </Menu.Item>
        {typeof user?.profile === 'object' && user?.profile?.slug ? (
          <Menu.Item
            component={Link}
            href={`/profile/${user?.profile?.slug}`}
            leftSection={<Icon icon={IconUser} size="1rem" />}
          >
            {data?.profile?.label || 'Profile'}
          </Menu.Item>
        ) : (
          <Menu.Item>{data?.createProfile?.label || 'Create Profile'}</Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item
          leftSection={<Icon icon={IconLogout} size="1rem" />}
          c="red"
          // onClick={() => signOut({ currentPath, redirectTo: '/login' })}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
