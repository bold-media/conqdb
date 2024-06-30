import { AppShell, AppShellFooter, AppShellNavbar } from "@mantine/core";
import React from "react";

const UnitsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          mobile: true,
          desktop: false,
        },
      }}
      footer={{
        height: { base: 60, sm: 0 },
      }}
    >
      <AppShellNavbar></AppShellNavbar>
      {children}
      <AppShellFooter hiddenFrom="sm"></AppShellFooter>
    </AppShell>
  );
};

export default UnitsLayout;
