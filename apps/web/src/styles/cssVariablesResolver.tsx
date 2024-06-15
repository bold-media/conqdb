import { CSSVariablesResolver } from "@mantine/core";

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},

  light: {
    // "--mantine-color-text": `var(--mantine-color-dark-7)`,
    // "--mantine-color-red-text": `var(--mantine-color-red-8)`,
    // "--mantine-color-green-text": `var(--mantine-color-green-8)`,
    // "--mantine-color-body": `var(--mantine-color-gray-0)`,
    // "--mantine-color-dimmed": `var(--mantine-color-dark-2)`,
    // "--mantine-color-error": `var(--mantine-color-red-8)`,
    // "--mantine-color-placeholder": `var(--mantine-color-gray-8)`,
    // "--mantine-color-anchor": `var(--mantine-color-blue-8)`,
    // "--mantine-color-default": `var(--mantine-color-gray-1)`,
    // "--mantine-color-default-hover": `var(--mantine-color-gray-0)`,
    // "--mantine-color-default-color": `var(--mantine-color-dark-9)`,
    // "--mantine-color-default-border": `var(--mantine-color-gray-3)`,
    // //additions
    // "--mono-bg": `var(--mantine-color-dark-11)`,
    // "--mono-hover": `var(--mantine-color-dark-10)`,
    // "--mono-color": `var(--mantine-color-dark-0)`,
    // "--mono-light-bg": `var(--mantine-color-dark-alpha-1)`,
    // "--mono-light-hover": `var(--mantine-color-dark-alpha-2)`,
    // "--mono-light-color": `var(--mantine-color-dark-11)`,
    // "--mono-outline-hover": `var(--mantine-color-dark-alpha-1)`,
    // "--mono-outline-color": `var(--mantine-color-dark-11)`,
    // "--mono-outline-border": `var(--mantine-color-dark-9)`,
    // "--mono-subtle-hover": `var(--mantine-color-dark-alpha-1)`,
    // "--mono-subtle-color": `var(--mantine-color-dark-11)`,
    // "--subtle-hover": `var(--mantine-color-dark-alpha-1)`,

    "--mantine-color-red-light": `var(--mantine-color-red-alpha-3)`,
    "--mantine-color-red-light-color": "var(--mantine-color-red-10)",
  },

  dark: {
    "--app-shell-border-color": "red",
    "--mantine-color-text": `var(--mantine-color-dark-0)`,
    "--mantine-color-red-text": `var(--mantine-color-red-8)`,
    "--mantine-color-green-text": `var(--mantine-color-green-8)`,
    "--mantine-color-body": `var(--mantine-color-dark-11)`,
    "--mantine-color-dimmed": `var(--mantine-color-dark-2)`,
    "--mantine-color-error": `var(--mantine-color-red-8)`,
    "--mantine-color-placeholder": `var(--mantine-color-dark-2)`,
    "--mantine-color-anchor": `var(--mantine-color-blue-8)`,
    "--mantine-color-default": `var(--mantine-color-dark-10)`,
    "--mantine-color-default-hover": `var(--mantine-color-dark-9)`,
    "--mantine-color-default-color": `var(--mantine-color-gray-0)`,
    "--mantine-color-default-border": `var(--mantine-color-dark-8)`,

    "--menu-item-hover": `var(--mantine-color-dark-alpha-1)`,

    //additions
    "--mono-bg": `var(--mantine-color-dark-0)`,
    "--mono-hover": `var(--mantine-color-gray-0)`,
    "--mono-color": `var(--mantine-color-dark-11)`,

    "--mono-light-bg": `var(--mantine-color-dark-alpha-1)`,
    "--mono-light-hover": `var(--mantine-color-dark-alpha-2)`,
    "--mono-light-color": `var(--mantine-color-dark-0)`,

    "--mono-outline-hover": `var(--mantine-color-dark-alpha-1)`,
    "--mono-outline-color": `var(--mantine-color-dark-0)`,
    "--mono-outline-border": `var(--mantine-color-dark-0)`,

    "--mono-subtle-hover": `var(--mantine-color-dark-alpha-1)`,
    "--mono-subtle-color": `var(--mantine-color-dark-0)`,

    "--subtle-hover": `var(--mantine-color-dark-alpha-1)`,

    //all colors that are changed for darkmode:

    "--mantine-color-dark-alpha-0": "#00000000",
    "--mantine-color-dark-alpha-1": "#D8F4F609",
    "--mantine-color-dark-alpha-2": "#DDEAF814",
    "--mantine-color-dark-alpha-3": "#D3EDF81D",
    "--mantine-color-dark-alpha-4": "#D9EDFE25",
    "--mantine-color-dark-alpha-5": "#D6EBFD30",
    "--mantine-color-dark-alpha-6": "#D9EDFF40",
    "--mantine-color-dark-alpha-7": "#D9EDFF5D",
    "--mantine-color-dark-alpha-8": "#DFEBFD6D",
    "--mantine-color-dark-alpha-9": "#E5EDFD7B",
    "--mantine-color-dark-alpha-10": "#F1F7FEB5",
    "--mantine-color-dark-alpha-11": "#FCFDFFEF",

    "--mantine-color-gray-alpha-0": "#00000000",
    "--mantine-color-gray-alpha-1": "#D8F4F609",
    "--mantine-color-gray-alpha-2": "#DDEAF814",
    "--mantine-color-gray-alpha-3": "#D3EDF81D",
    "--mantine-color-gray-alpha-4": "#D9EDFE25",
    "--mantine-color-gray-alpha-5": "#D6EBFD30",
    "--mantine-color-gray-alpha-6": "#D9EDFF40",
    "--mantine-color-gray-alpha-7": "#D9EDFF5D",
    "--mantine-color-gray-alpha-8": "#DFEBFD6D",
    "--mantine-color-gray-alpha-9": "#E5EDFD7B",
    "--mantine-color-gray-alpha-10": "#F1F7FEB5",
    "--mantine-color-gray-alpha-11": "#FCFDFFEF",

    "--mantine-color-blue-0": "#0d1520",
    "--mantine-color-blue-1": "#111927",
    "--mantine-color-blue-2": "#0d2847",
    "--mantine-color-blue-3": "#003362",
    "--mantine-color-blue-4": "#004074",
    "--mantine-color-blue-5": "#104d87",
    "--mantine-color-blue-6": "#205d9e",
    "--mantine-color-blue-7": "#2870bd",
    "--mantine-color-blue-8": "#0090ff",
    "--mantine-color-blue-9": "#3b9eff",
    "--mantine-color-blue-10": "#70b8ff",
    "--mantine-color-blue-11": "#c2e6ff",

    "--mantine-color-blue-alpha-0": "#004df211",
    "--mantine-color-blue-alpha-1": "#1166fb18",
    "--mantine-color-blue-alpha-2": "#0077ff3a",
    "--mantine-color-blue-alpha-3": "#0075ff57",
    "--mantine-color-blue-alpha-4": "#0081fd6b",
    "--mantine-color-blue-alpha-5": "#0f89fd7f",
    "--mantine-color-blue-alpha-6": "#2a91fe98",
    "--mantine-color-blue-alpha-7": "#3094feb9",
    "--mantine-color-blue-alpha-8": "#0090ff",
    "--mantine-color-blue-alpha-9": "#3b9eff",
    "--mantine-color-blue-alpha-10": "#70b8ff",
    "--mantine-color-blue-alpha-11": "#c2e6ff",

    "--mantine-color-green-0": "#0e1512",
    "--mantine-color-green-1": "#121b17",
    "--mantine-color-green-2": "#132d21",
    "--mantine-color-green-3": "#113b29",
    "--mantine-color-green-4": "#174933",
    "--mantine-color-green-5": "#20573e",
    "--mantine-color-green-6": "#28684a",
    "--mantine-color-green-7": "#2f7c57",
    "--mantine-color-green-8": "#30a46c",
    "--mantine-color-green-9": "#33b074",
    "--mantine-color-green-10": "#3dd68c",
    "--mantine-color-green-11": "#b1f1cb",

    "--mantine-color-green-alpha-0": "#00de4505",
    "--mantine-color-green-alpha-1": "#29f99d0b",
    "--mantine-color-green-alpha-2": "#22ff991e",
    "--mantine-color-green-alpha-3": "#11ff992d",
    "--mantine-color-green-alpha-4": "#2bffa23c",
    "--mantine-color-green-alpha-5": "#44ffaa4b",
    "--mantine-color-green-alpha-6": "#50fdac5e",
    "--mantine-color-green-alpha-7": "#54ffad73",
    "--mantine-color-green-alpha-8": "#44ffa49e",
    "--mantine-color-green-alpha-9": "#43fea4ab",
    "--mantine-color-green-alpha-10": "#46fea5d4",
    "--mantine-color-green-alpha-11": "#bbffd7f0",

    "--mantine-color-red-0": "#191111",
    "--mantine-color-red-1": "#201314",
    "--mantine-color-red-2": "#3b1219",
    "--mantine-color-red-3": "#500f1c",
    "--mantine-color-red-4": "#611623",
    "--mantine-color-red-5": "#72232d",
    "--mantine-color-red-6": "#8c333a",
    "--mantine-color-red-7": "#b54548",
    "--mantine-color-red-8": "#e5484d",
    "--mantine-color-red-9": "#ec5d5e",
    "--mantine-color-red-10": "#ff9592",
    "--mantine-color-red-11": "#ffd1d9",

    "--mantine-color-red-alpha-0": "#f4121209",
    "--mantine-color-red-alpha-1": "#f22f3e11",
    "--mantine-color-red-alpha-2": "#ff173f2d",
    "--mantine-color-red-alpha-3": "#fe0a3b44",
    "--mantine-color-red-alpha-4": "#ff204756",
    "--mantine-color-red-alpha-5": "#ff3e5668",
    "--mantine-color-red-alpha-6": "#ff536184",
    "--mantine-color-red-alpha-7": "#ff5d61b0",
    "--mantine-color-red-alpha-8": "#fe4e54e4",
    "--mantine-color-red-alpha-9": "#ff6465eb",
    "--mantine-color-red-alpha-10": "#ff9592",
    "--mantine-color-red-alpha-11": "#ffd1d9",

    "--mantine-color-red-light": `var(--mantine-color-red-alpha-2)`,
    "--mantine-color-red-light-color": "var(--mantine-color-red-11)",
  },
});
