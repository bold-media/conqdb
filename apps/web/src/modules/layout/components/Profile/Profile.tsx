"use client";
import React from "react";
import { useAuthMe } from "@/modules/auth/hooks/useAuthMe";
import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import {
  IconBell,
  IconLogout,
  IconTableOptions,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons-react";
import { Icon } from "@/modules/common/components/Icon";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { Link } from "@/navigation";

export const Profile = () => {
  const { data: user } = useAuthMe();
  const { mutate: logout } = useLogout();

  if (!user) {
    return null;
  }

  return (
    <Menu trigger="click-hover">
      <Menu.Target>
        <UnstyledButton
          style={{ borderRadius: "50%" }}
          className="mantine-active"
        >
          <Avatar
            radius="xl"
            src={
              user?.discordAvatar
                ? `https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.discordAvatar}.png`
                : undefined
            }
          >
            {!user.discordAvatar ? (
              <>
                <Icon icon={IconUserCircle} size={28} c="gray" lightHidden />
                <Icon icon={IconUserCircle} size={28} c="dark" darkHidden />
              </>
            ) : undefined}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon icon={IconBell} size={16} />}>
          Notifications
        </Menu.Item>
        {user?.profile?.slug ? (
          <Menu.Item
            component={Link}
            href={`/profile/${user?.profile?.slug}`}
            leftSection={<Icon icon={IconUser} size={16} />}
          >
            Profile
          </Menu.Item>
        ) : (
          <Menu.Item
            component={Link}
            href="/profile/create"
            leftSection={<Icon icon={IconUserPlus} size={16} />}
          >
            Create Profile
          </Menu.Item>
        )}
        {user?.isAdmin ? (
          <Menu.Item
            component={Link}
            href="/admin"
            leftSection={<Icon icon={IconTableOptions} size={16} />}
          >
            Admin Dashboard
          </Menu.Item>
        ) : undefined}
        <Menu.Divider />
        <Menu.Item
          leftSection={<Icon icon={IconLogout} size={16} />}
          c="red"
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
