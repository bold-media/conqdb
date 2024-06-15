import React from "react";
import "@mantine/core/styles.layer.css";
import { getDirFromLocale } from "@/modules/layout/utils/getDirFromLocale";
import { selectFont } from "@/modules/layout/utils/selectFont";
import { unstable_setRequestLocale } from "next-intl/server";
import { ColorSchemeScript } from "@mantine/core";
import { RootLayoutTemplate } from "@/modules/layout/templates/RootLayoutTemplate";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  params: { locale },
}) => {
  const font = selectFont(locale);
  const dir = getDirFromLocale(locale);
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} dir={dir} className={`${font.className}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <RootLayoutTemplate font={font}>{children}</RootLayoutTemplate>
      </body>
    </html>
  );
};

export default RootLayout;
