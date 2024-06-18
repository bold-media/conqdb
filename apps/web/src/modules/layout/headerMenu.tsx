import {
  IconAbacus,
  IconBadges,
  IconBook,
  IconCalculator,
  IconHome,
  IconHourglass,
  IconListCheck,
  IconShieldUp,
  IconSwords,
  IconTableShare,
} from "@tabler/icons-react";
import { ComponentType } from "react";

// interface HeaderMenuLinkBase {
//   translationKey: string;
//   defaultLabel: string;
//   showOnMobile?: boolean;
// }

// interface HeaderMenuRootLinkWithoutChildren extends HeaderMenuLinkBase {
//   url: string;
//   children?: never;
// }

// interface HeaderMenuRootLinkWithChildren extends HeaderMenuLinkBase {
//   url?: string;
//   children: HeaderMenuChildItem[];
// }

// interface HeaderMenuChildLinkWithoutChildren extends HeaderMenuLinkBase {
//   url: string;
//   children?: never;
//   icon?: ComponentType;
// }

// interface HeaderMenuChildLinkWithChildren extends HeaderMenuLinkBase {
//   url?: string;
//   children: HeaderMenuChildItem[];
//   icon?: ComponentType;
// }

// export type HeaderMenuChildItem =
//   | HeaderMenuChildLinkWithoutChildren
//   | HeaderMenuChildLinkWithChildren;

// export type HeaderMenuLink =
//   | HeaderMenuRootLinkWithChildren
//   | HeaderMenuRootLinkWithoutChildren;

// export type HeaderMenu = HeaderMenuLink[];

interface BaseMenuItem {
  labelKey: string;
  defaultLabel: string;
}

export interface ChildItem extends BaseMenuItem {
  url: string;
  descriptionKey: string;
  defaultDescription: string;
  icon: ComponentType;
  comingSoon?: boolean;
}

interface CallToAction {
  titleKey: string;
  defaultTitle: string;
  descriptionKey: string;
  defaultDescription: string;
  btnLabelKey: string;
  defaultBtnLabel: string;
  url: string;
}

interface RootItemWithoutChildren extends BaseMenuItem {
  url: string;
  children?: never;
}

interface RootItemWithChildren extends BaseMenuItem {
  url?: never;
  children: ChildItem[];
  callToAction?: CallToAction;
}

export type HeaderMenuItem = RootItemWithChildren | RootItemWithoutChildren;

export type HeaderMenu = HeaderMenuItem[];

export const headerMenu: HeaderMenu = [
  {
    labelKey: "menu.news",
    defaultLabel: "News",
    url: "/news",
  },
  {
    labelKey: "menu.units.label",
    defaultLabel: "Units",
    children: [
      {
        labelKey: "menu.units.allUnits.label",
        defaultLabel: "All Units",
        descriptionKey: "menu.units.allUnits.description",
        defaultDescription: "Database of all units in Conqueror's Blade.",
        url: "/units",
        icon: IconBadges,
      },
      {
        labelKey: "menu.units.doctrines.label",
        defaultLabel: "Doctrines",
        descriptionKey: "menu.units.doctrines.description",
        defaultDescription: "Database of all doctrines in Conqueror's Blade.",
        url: "/doctrines",
        icon: IconShieldUp,
        comingSoon: true,
      },
      {
        labelKey: "menu.units.guides.label",
        defaultLabel: "Guides",
        descriptionKey: "menu.units.guides.description",
        defaultDescription: "Unit-specific guides, submitted by users.",
        url: "/guides/units",
        icon: IconBook,
        comingSoon: true,
      },
      {
        labelKey: "menu.units.tierList.label",
        defaultLabel: "Tier List",
        descriptionKey: "menu.units.tierList.description",
        defaultDescription:
          "Unit tier-list for the current season, based on user votes.",
        url: "/tier-list/units",
        icon: IconTableShare,
        comingSoon: true,
      },
    ],
  },
  {
    labelKey: "menu.weapons",
    defaultLabel: "Weapons",
    children: [
      {
        labelKey: "menu.weapons.allWeapons.label",
        defaultLabel: "All weapons",
        descriptionKey: "menu.weapons.allWeapons.description",
        defaultDescription: "Database of all weapons in Conqueror's Blade.",
        url: "/weapons",
        icon: IconSwords,
        comingSoon: true,
      },
      {
        labelKey: "menu.weapons.guides.label",
        defaultLabel: "Guides",
        descriptionKey: "menu.weapons.guides.description",
        defaultDescription: "Weapon-specific guides, submitted by users.",
        url: "/guides/weapons",
        icon: IconBook,
        comingSoon: true,
      },
      {
        labelKey: "menu.weapons.tierList.label",
        defaultLabel: "Tier List",
        descriptionKey: "menu.weapons.tierList.description",
        defaultDescription:
          "Weapon tier-list for the current season, based on user votes.",
        url: "/tier-list/weapons",
        icon: IconTableShare,
        comingSoon: true,
      },
    ],
  },
  {
    labelKey: "menu.tools",
    defaultLabel: "Tools",
    children: [
      {
        labelKey: "menu.tools.leadershipCalculator.label",
        defaultLabel: "Leadership Calculator",
        descriptionKey: "menu.tools.leadershipCalculator.description",
        defaultDescription: "Unit warband leadership calculator.",
        url: "/tools/leadership-calculator",
        icon: IconAbacus,
        comingSoon: true,
      },
      {
        labelKey: "menu.tools.unitXpCalculator.label",
        defaultLabel: "Unit XP Calculator",
        descriptionKey: "menu.tools.unitXpCalculator.description",
        defaultDescription: "Calculate how much XP you need.",
        url: "/tools/unit-xp-calculator",
        icon: IconHourglass,
        comingSoon: true,
      },
      {
        labelKey: "menu.tools.scrimBuilder.label",
        defaultLabel: "Scrim Builder",
        descriptionKey: "menu.tools.scrimBuilder.description",
        defaultDescription:
          "Assign units, weapons and artillery to groups for a scrim.",
        url: "/tools/scrim-builder",
        icon: IconListCheck,
        comingSoon: true,
      },
    ],
  },
];
