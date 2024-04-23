"use client";

import type { BoxProps } from "@mantine/core";
import {
  Text,
  Tooltip,
  UnstyledButton,
  createPolymorphicComponent,
} from "@mantine/core";

import cx from "clsx";
import classes from "./HeaderControl.module.css";
import React from "react";

export interface HeaderControlProps extends BoxProps {
  tooltip: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const _HeaderControl = ({
  tooltip,
  className,
  disabled = false,
  ...others
}: HeaderControlProps) => {
  return (
    <Tooltip
      label={
        <Text size="xs" c="gray.0">
          {tooltip}
        </Text>
      }
      disabled={disabled}
    >
      <UnstyledButton
        className={cx(classes.control, "mantine-active", className)}
        aria-label={tooltip}
        {...others}
      />
    </Tooltip>
  );
};

export const HeaderControl = createPolymorphicComponent<
  "button",
  HeaderControlProps
>(_HeaderControl);
