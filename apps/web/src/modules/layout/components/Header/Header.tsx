import {
  AppShellHeader,
  Badge,
  Burger,
  BurgerProps,
  Group,
} from "@mantine/core";
import React from "react";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderControls } from "../HeaderControls";

interface HeaderProps {
  children?: React.ReactNode;
  burgerProps?: BurgerProps;
}

export const Header: React.FC<HeaderProps> = ({ burgerProps, children }) => {
  return (
    <AppShellHeader px="md">
      <Group align="center" justify="space-between" h="100%">
        <Group>
          {burgerProps ? <Burger {...burgerProps} /> : undefined}
          <HeaderLogo />
          <Badge color="red" variant="light">
            Beta
          </Badge>
          {children}
        </Group>
        <HeaderControls />
      </Group>
    </AppShellHeader>
  );
};
