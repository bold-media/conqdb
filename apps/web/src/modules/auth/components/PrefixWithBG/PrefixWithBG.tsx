"use client";
import React from "react";
import classes from "./PrefixWithBG.module.css";
import {
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { BrandLogo } from "@/modules/common/components/BrandLogo";
import { Icon } from "@/modules/common/components/Icon";
import { IconCheck } from "@tabler/icons-react";

interface PrefixWithBGProps {
  children?: React.ReactNode;
}
export const PrefixWithBG: React.FC<PrefixWithBGProps> = ({ children }) => {
  return (
    <Box className={classes.background}>
      <Box
        component="video"
        className={classes.video}
        autoPlay={true}
        muted
        loop
      >
        <source src="/videos/knightfall-trailer.mp4" type="video/mp4" />
      </Box>
      <Container size="xs" mt={rem(42)}>
        <Stack align="center" mb="xl">
          <BrandLogo w={{ base: "10rem", md: "12rem" }} />
          <Divider w="100%" />
          <Group>
            <Group gap={rem(7)} justify="center">
              <ThemeIcon variant="light" color="blue" size="xs">
                <Icon icon={IconCheck} />
              </ThemeIcon>
              <Text size="xs" tt="uppercase" fw={500} lh={1}>
                TW Raid Manager
              </Text>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={rem(7)} justify="center">
              <ThemeIcon variant="light" color="blue" size="xs">
                <Icon icon={IconCheck} />
              </ThemeIcon>
              <Text size="xs" tt="uppercase" fw={500} lh={1}>
                Exclusive Features
              </Text>
            </Group>
          </Group>
        </Stack>
      </Container>
      {children}
    </Box>
  );
};
