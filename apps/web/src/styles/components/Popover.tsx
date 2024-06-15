import { Popover } from "@mantine/core";
import classes from "./AppShell.module.css";

export const DefaultPopover = Popover.extend({
  classNames: {
    dropdown: classes.dropdown,
  },
});
