"use client";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { theme } from "@/styles/theme";
import { cssVariablesResolver } from "@/styles/cssVariablesResolver";

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
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider
        theme={{ ...theme, fontFamily: font.style.fontFamily }}
        cssVariablesResolver={cssVariablesResolver}
        defaultColorScheme="auto"
      >
        <Notifications />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
};
