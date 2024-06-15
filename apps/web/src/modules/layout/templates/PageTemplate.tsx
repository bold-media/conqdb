import { AppShellMain } from "@mantine/core";
import React from "react";

export const PageTemplate = ({ children }: { children: React.ReactNode }) => {
  return <AppShellMain>{children}</AppShellMain>;
};
