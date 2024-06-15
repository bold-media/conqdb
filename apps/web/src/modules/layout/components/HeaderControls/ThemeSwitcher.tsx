"use client";

import React from "react";
import { HeaderControl } from "./HeaderControl";
import {
  Box,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ThemeSwitcher = ({ label }: { label: string }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <HeaderControl
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      tooltip={label}
    >
      <Box
        component={IconSun}
        darkHidden
        stroke={1.5}
        w={rem(22)}
        h={rem(22)}
      />
      <Box
        component={IconMoon}
        lightHidden
        stroke={1.5}
        w={rem(22)}
        h={rem(22)}
      />
    </HeaderControl>
  );
};
