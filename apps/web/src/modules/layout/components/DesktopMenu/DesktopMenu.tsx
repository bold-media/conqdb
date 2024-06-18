"use client";
import {
  Anchor,
  Box,
  Card,
  Divider,
  Group,
  HoverCard,
  Menu,
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

const MenuItemChild = ({ item }: { item: ChildItem }) => {
  const title = item?.defaultLabel;
  const description = item?.defaultDescription;
  return (
    <UnstyledButton component={Link} href={item.url}>
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon size={34} variant="default" radius="md">
          <Icon icon={item.icon} size={22} c="blue.6" />
        </ThemeIcon>
        <Box>
          <Text size="sm" fw={500}>
            {title}
          </Text>
          <Text size="xs" c="dimmed">
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
    // <UnstyledButton component={Link} href={item.url}>
    //   {linkLabel}
    // </UnstyledButton>

    <NavigationMenu.Link asChild>
      <UnstyledButton component={Link} href={item.url} className={classes.link}>
        {linkLabel}
      </UnstyledButton>
    </NavigationMenu.Link>
  ) : (
    <NavigationMenu.Trigger asChild>
      <UnstyledButton className={classes.trigger}>{linkLabel}</UnstyledButton>
    </NavigationMenu.Trigger>
  );

  return (
    <NavigationMenu.Item>
      {BaseElement}
      {item?.children ? (
        <NavigationMenu.Content asChild>
          <Card className={classes.content}>
            <Text>{linkLabel}</Text>
            <Divider my="sm" />
            <SimpleGrid cols={2} spacing={0}>
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

  //   if (item?.children) {
  //     return (
  //         <HoverCard width={572}>
  //           <HoverCard.Target>{BaseElement}</HoverCard.Target>
  //           <HoverCard.Dropdown>
  //             <Text>{linkLabel}</Text>
  //             <Divider my="sm" />
  //             <SimpleGrid cols={2} spacing={0}>
  //               {item.children.map((child) => (
  //                 <MenuItemChild key={child.labelKey} item={child} />
  //               ))}
  //             </SimpleGrid>
  //           </HoverCard.Dropdown>
  //         </HoverCard>
  //     );
  //   } else {
  //     return BaseElement;
  //   }
};

export const DesktopMenu = () => {
  return (
    // <Group>
    //   {headerMenu.map((item) => {
    //     return <RootMenuItem key={item.labelKey} item={item} />;
    //   })}
    // </Group>

    <NavigationMenu.Root className={classes.root}>
      <NavigationMenu.List asChild>
        <Group className={classes.list} component="ul">
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
