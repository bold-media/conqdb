"use client";
import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import { ChildItem, HeaderMenuItem, headerMenu } from "../../headerMenu";
import { Link } from "@/navigation";
import { Icon } from "@/modules/common/components/Icon";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classes from "./DesktopMenu.module.css";
import clsx from "clsx";

const MenuItemChild = ({ item }: { item: ChildItem }) => {
  const title = item?.defaultLabel;
  const description = item?.defaultDescription;
  return (
    <UnstyledButton
      component={!item.comingSoon ? Link : undefined}
      aria-disabled={item.comingSoon ? true : false}
      tabIndex={item.comingSoon ? -1 : 0}
      href={item.url}
      className={clsx(classes.childLink, {
        [`${classes.disabled}`]: item.comingSoon,
      })}
    >
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon
          size={34}
          variant="default"
          radius="md"
          className={classes.childIcon}
        >
          <Icon icon={item.icon} size={22} />
        </ThemeIcon>
        <Box>
          <Text size="sm" fw={500} className={classes.childLabel}>
            {title}
          </Text>
          {item?.comingSoon ? (
            <Text
              fz={10}
              lh={1}
              tt="uppercase"
              fw={600}
              mb={3}
              className={classes.comingSoon}
            >
              Coming Soon
            </Text>
          ) : undefined}
          <Text size="xs" c="dimmed" className={classes.childDescription}>
            {description}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
};

const RootMenuItem = ({ item }: { item: HeaderMenuItem }) => {
  const linkLabel = item?.defaultLabel;

  const BaseElement = item?.url ? (
    <NavigationMenu.Link asChild>
      <UnstyledButton
        component={Link}
        href={item.url}
        className={clsx(classes.link, "mantine-focus-auto")}
      >
        {linkLabel}
      </UnstyledButton>
    </NavigationMenu.Link>
  ) : (
    <NavigationMenu.Trigger asChild>
      <UnstyledButton className={clsx(classes.trigger, "mantine-focus-auto")}>
        {linkLabel}
      </UnstyledButton>
    </NavigationMenu.Trigger>
  );

  return (
    <NavigationMenu.Item>
      {BaseElement}
      {item?.children ? (
        <NavigationMenu.Content asChild>
          <Card className={classes.content} p={0}>
            <Text p="sm" size="sm" fw={500}>
              {linkLabel}
            </Text>
            <Divider mx="sm" />
            <SimpleGrid cols={2} spacing={2} px="sm" py="sm">
              {item.children.map((child) => (
                <NavigationMenu.Link asChild key={child.labelKey}>
                  <MenuItemChild item={child} />
                </NavigationMenu.Link>
              ))}
            </SimpleGrid>
          </Card>
        </NavigationMenu.Content>
      ) : undefined}
    </NavigationMenu.Item>
  );
};

export const DesktopMenu = () => {
  return (
    <NavigationMenu.Root className={classes.root}>
      <NavigationMenu.List asChild>
        <Group className={classes.list} component="ul" visibleFrom="md">
          {headerMenu.map((item) => {
            return <RootMenuItem key={item.labelKey} item={item} />;
          })}

          <NavigationMenu.Indicator className={classes.indicator}>
            <div className={classes.arrow} />
          </NavigationMenu.Indicator>
        </Group>
      </NavigationMenu.List>
      <div className={classes.viewportPosition}>
        <NavigationMenu.Viewport className={classes.viewport} />
      </div>
    </NavigationMenu.Root>
  );
};
