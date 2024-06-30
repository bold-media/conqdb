"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import classes from "./MobileMenu.module.css";
import { BrandLogo } from "@/modules/common/components/BrandLogo";
import { HeaderMenuItem, headerMenu } from "../../headerMenu";
import { Link } from "@/navigation";
import { useDisclosure } from "@mantine/hooks";
import { Icon } from "@/modules/common/components/Icon";
import { IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { LanguageSwitcher } from "../HeaderControls/LanguageSwitcher";
import { ThemeSwitcher } from "../HeaderControls/ThemeSwitcher";

interface MobileMenuProps {
  opened: boolean;
  toggle: () => void;
  close: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  opened,
  toggle,
  close,
}) => {
  const [openedLink, setOpenedLink] = useState("");
  return (
    <Drawer.Root opened={opened} onClose={close}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Box className={classes.container}>
          <Drawer.Header className={classes.header}>
            <BrandLogo h="2rem" />
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body component={ScrollArea} className={classes.main} p={0}>
            <Stack gap={0}>
              {headerMenu?.map((item) => {
                return (
                  <React.Fragment key={item.labelKey}>
                    {item?.children ? (
                      <MobileMenuItemWithChildren
                        item={item}
                        openedLink={openedLink}
                        setOpenedLink={setOpenedLink}
                      />
                    ) : (
                      <MobileMenuItem item={item} />
                    )}
                    <Divider />
                  </React.Fragment>
                );
              })}
            </Stack>
          </Drawer.Body>
          <Box className={classes.footer}>
            <Group gap={0} w="100%">
              <UnstyledButton className={clsx(classes.actionButton)}>
                <Stack w="100%" align="center" gap={4}>
                  <LanguageSwitcher label="Switch Language" tooltip={false} />
                  <Text fz={8} fw={500} c="dimmed">
                    Switch Language
                  </Text>
                </Stack>
              </UnstyledButton>
              <Divider orientation="vertical" />
              <UnstyledButton className={clsx(classes.actionButton)}>
                <Stack w="100%" align="center" gap={4}>
                  <ThemeSwitcher label="Toggle Color Scheme" tooltip={false} />
                  <Text fz={8} fw={500} c="dimmed">
                    Toggle Color Scheme
                  </Text>
                </Stack>
              </UnstyledButton>
            </Group>
          </Box>
        </Box>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const MobileMenuItem = ({ item }: { item: HeaderMenuItem }) => {
  const title = item?.defaultLabel;

  return (
    <UnstyledButton
      component={Link}
      href={item.url as string}
      className={classes.link}
    >
      {title}
    </UnstyledButton>
  );
};

const MobileMenuItemWithChildren = ({
  item,
  openedLink,
  setOpenedLink,
}: {
  item: HeaderMenuItem;
  openedLink: string;
  setOpenedLink: (state: string) => void;
}) => {
  const title = item.defaultLabel;
  // const [opened, { toggle }] = useDisclosure();

  const opened = useMemo(() => {
    return item.labelKey === openedLink;
  }, [openedLink]);

  const toggle = useCallback(() => {
    if (openedLink === item.labelKey) {
      setOpenedLink("");
    } else {
      setOpenedLink(item.labelKey);
    }
  }, [openedLink]);

  return (
    <Box>
      <UnstyledButton className={classes.link} onClick={toggle}>
        <Group justify="space-between" w="100%">
          {title}
          <Icon
            icon={IconChevronRight}
            size={14}
            className={clsx(classes.chevron, {
              [`${classes.chevronActive}`]: opened,
            })}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>
        <Stack gap={2}>
          {item?.children?.map((child) => (
            <UnstyledButton
              component={!child.comingSoon ? Link : undefined}
              aria-disabled={child.comingSoon ? true : false}
              tabIndex={child.comingSoon ? -1 : 0}
              href={child.url}
              className={clsx(classes.childLink, {
                [`${classes.disabled}`]: child.comingSoon,
              })}
            >
              <Group align="flex-start" wrap="nowrap">
                <ThemeIcon
                  size={34}
                  variant="default"
                  radius="md"
                  className={classes.childIcon}
                >
                  <Icon icon={child.icon} size={22} />
                </ThemeIcon>
                <Box>
                  <Group>
                    <Text size="sm" fw={500} className={classes.childLabel}>
                      {title}
                    </Text>
                    {child?.comingSoon ? (
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
                  </Group>

                  <Text
                    size="xs"
                    c="dimmed"
                    className={classes.childDescription}
                  >
                    {child.defaultDescription}
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};
