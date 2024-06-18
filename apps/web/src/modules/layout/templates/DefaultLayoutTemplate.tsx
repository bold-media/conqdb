"use client";

import React from "react";
import { Header } from "../components/Header";
import { AppShell } from "@/modules/layout/components/AppShell";
import { useDisclosure } from "@mantine/hooks";
import { DesktopMenu } from "../components/DesktopMenu";

export const DefaultLayoutTemplate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuOpened, { toggle: toggleMenu }] = useDisclosure();

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
      {children}
    </AppShell>
  );
};
