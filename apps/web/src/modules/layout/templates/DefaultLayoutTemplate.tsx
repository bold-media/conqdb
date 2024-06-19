"use client";

import React from "react";
import { Header } from "../components/Header";
import { AppShell } from "@/modules/layout/components/AppShell";
import { useDisclosure } from "@mantine/hooks";
import { DesktopMenu } from "../components/DesktopMenu";
import { MobileMenu } from "../components/MobileMenu";

export const DefaultLayoutTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure();

  return (
    <AppShell>
      <Header
        burgerProps={{
          opened: menuOpened,
          onClick: toggleMenu,
          hiddenFrom: "md",
        }}
      >
        <DesktopMenu />
      </Header>
      <MobileMenu opened={menuOpened} toggle={toggleMenu} close={closeMenu} />
      {children}
    </AppShell>
  );
};
