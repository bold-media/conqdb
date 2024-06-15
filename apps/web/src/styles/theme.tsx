"use client";

import { MantineTheme, createTheme } from "@mantine/core";
import { components } from "./components";
import { colors } from "./colors";
import { variantColorResolver } from "./variantColorResolver";

/** @ts-ignore */
export const theme: MantineTheme = createTheme({
  cursorType: "pointer",
  components,
  primaryShade: {
    light: 9,
    dark: 9,
  },
  black: "#0D0E0F",
  colors,
  variantColorResolver,
});
