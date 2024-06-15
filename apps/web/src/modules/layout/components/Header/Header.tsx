import { AppShellHeader, Badge, Group } from "@mantine/core";
import React from "react";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderControls } from "../HeaderControls";

export const Header = () => {
  return (
    <AppShellHeader px="md">
      <Group align="center" justify="space-between" h="100%">
        <Group gap="xl">
          <HeaderLogo />
          <Badge color="red" variant="light">
            Beta
          </Badge>
        </Group>
        <HeaderControls />
      </Group>
    </AppShellHeader>
  );
};
