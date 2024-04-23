'use client'
import { Avatar, Menu, UnstyledButton } from '@mantine/core'
import { User } from 'payload-types'
import React from 'react'
import { IconBell, IconLogout, IconUserCircle } from '@tabler/icons-react'
import { Icon } from '@/modules/common/components/Icon'
import { signOut } from '@/lib/auth'
import { usePathname } from '@/navigation'

interface ProfileClientProps {
  user: User
}

export const ProfileClient: React.FC<ProfileClientProps> = ({ user }) => {
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
        <Menu.Item leftSection={<Icon icon={IconBell} size="1rem" />}>Notifications</Menu.Item>
        <Menu.Divider />
        <Menu.Item
          leftSection={<Icon icon={IconLogout} size="1rem" />}
          c="red"
          onClick={() => signOut({ currentPath, redirectTo: '/login' })}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
