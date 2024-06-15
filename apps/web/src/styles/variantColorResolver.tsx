import {
  VariantColorsResolver,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const colorScheme = useColorScheme();
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (input.variant === "outline") {
    return {
      ...defaultResolvedColors,
      hover: `var(--mantine-color-${input.color}-alpha-1)`,
      border: `calc(0.0625rem * var(--mantine-scale)) solid var(--mantine-color-${input.color}-9)`,
      color: `var(--mantine-color-${input.color}-10)`,
    };
  }

  if (input.variant === "subtle") {
    return {
      ...defaultResolvedColors,
      hover: `var(--mantine-color-${input.color}-alpha-3)`,
      color: `var(--mantine-color-${input.color}-10)`,
    };
  }

  if (input.variant === "transparent") {
    return {
      ...defaultResolvedColors,
      color: `var(--mantine-color-${input.color}-10)`,
    };
  }

  if (input.variant === "mono") {
    return {
      background: `var(--mono-bg)`,
      hover: `var(--mono-hover)`,
      color: `var(--mono-color)`,
      border: "none",
    };
  }

  if (input.variant === "monoLight") {
    return {
      background: `var(--mono-light-bg)`,
      hover: `var(--mono-light-hover)`,
      color: `var(--mono-light-color)`,
      border: "none",
    };
  }

  if (input.variant === "monoOutline") {
    return {
      background: `transparent`,
      hover: `var(--mono-outline-hover)`,
      color: `var(--mono-outline-color)`,
      border: `calc(0.0625rem * var(--mantine-scale)) solid var(--mono-outline-border)`,
    };
  }

  if (input.variant === "monoSubtle") {
    return {
      background: `transparent`,
      hover: `var(--mono-subtle-hover)`,
      color: `var(--mono-subtle-color)`,
      border: "none",
    };
  }

  return defaultResolvedColors;
};
