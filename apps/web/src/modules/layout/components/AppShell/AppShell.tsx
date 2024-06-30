import { AppShell as MantineAppShell, AppShellProps } from "@mantine/core";
import React from "react";

interface BaseAppShellProps extends AppShellProps {}

export const AppShell: React.FC<BaseAppShellProps> = ({
  children,
  header = {
    height: { base: 60, md: 72 },
  },
  ...props
}) => {
  return (
    <MantineAppShell header={header} {...props}>
      {children}
    </MantineAppShell>
  );
};
