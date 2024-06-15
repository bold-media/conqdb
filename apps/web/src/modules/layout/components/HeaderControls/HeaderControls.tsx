import { Group, TooltipGroup, rem } from "@mantine/core";
import React from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Profile } from "../Profile";
import { LoginLink } from "../LoginLink";

export const HeaderControls = () => {
  return (
    <Group align="center" justify="center" gap={rem(12)}>
      <LoginLink label="Sign In" />
      <TooltipGroup openDelay={572} closeDelay={142}>
        <LanguageSwitcher label="Switch Language" />
        <ThemeSwitcher label="Toggle Color Scheme" />
      </TooltipGroup>
      <Profile />
    </Group>
  );
};
