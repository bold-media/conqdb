import { createSelectors } from "@/utils/createSelectors";
import { AppShellProps, deepMerge } from "@mantine/core";
import { create } from "zustand";

interface AppShellPropsState {
  appShellProps: AppShellProps;
  setAppShellProps: (appShellProps: Partial<AppShellProps>) => void;
  reset: () => void;
}

export const defaultAppShellProps: AppShellProps = {
  header: {
    height: { base: 60, md: 72 },
  },
  // navbar: {
  //   width: 300,
  //   breakpoint: "sm",
  //   collapsed: {
  //     mobile: true,
  //     desktop: true,
  //   },
  // },
};

const useAppShellPropsBase = create<AppShellPropsState>()((set) => ({
  appShellProps: defaultAppShellProps,
  setAppShellProps: (newProps: Partial<AppShellProps>) =>
    set(() => ({ appShellProps: deepMerge(defaultAppShellProps, newProps) })),
  reset: () => set(() => ({ appShellProps: defaultAppShellProps })),
}));

export const useAppShellProps = createSelectors(useAppShellPropsBase);
