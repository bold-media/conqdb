"use client";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "@/styles/theme";
import { cssVariablesResolver } from "@/styles/cssVariablesResolver";
import { AppShell } from "../components/AppShell";
import { Header } from "../components/Header";
import { DesktopMenu } from "../components/DesktopMenu";
import { MobileMenu } from "../components/MobileMenu";
import { useDisclosure } from "@mantine/hooks";

interface RootLayoutTemplateProps {
  children: React.ReactNode;
  font: {
    style: {
      fontFamily: string;
    };
  };
}

const queryClient = new QueryClient();

export const RootLayoutTemplate: React.FC<RootLayoutTemplateProps> = ({
  children,
  font,
}) => {
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] =
    useDisclosure();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider
        theme={{ ...theme, fontFamily: font.style.fontFamily }}
        cssVariablesResolver={cssVariablesResolver}
        defaultColorScheme="auto"
      >
        <Notifications />
        <AppShell>
          <Header
            burgerProps={{
              opened: menuOpened,
              onClick: toggleMenu,
              hiddenFrom: "md",
              size: "sm",
            }}
          >
            <DesktopMenu />
          </Header>
          <MobileMenu
            opened={menuOpened}
            toggle={toggleMenu}
            close={closeMenu}
          />
          {children}
        </AppShell>
        {/* {children} */}
      </MantineProvider>
    </QueryClientProvider>
  );
};
