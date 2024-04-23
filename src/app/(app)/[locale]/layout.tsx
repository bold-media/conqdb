import React from 'react'
import '@mantine/core/styles.css'
import { ColorSchemeScript } from '@mantine/core'
import { selectFont } from '@/modules/layout/utils/selectFont'
import { locales, localesData } from '@/locales'
import { unstable_setRequestLocale } from 'next-intl/server'
import { RootLayout } from '@/modules/layout/templates/RootLayout'
import { getDirFromLocale } from '@/utils/getDirFromLocale'

interface RootLayout {
  children: React.ReactNode
  params: {
    locale: (typeof locales)[number]
  }
}

const Layout: React.FC<RootLayout> = ({ children, params: { locale } }) => {
  const font = selectFont(locale)
  const dir = getDirFromLocale(locale)
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} dir={dir}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <RootLayout font={font}>{children}</RootLayout>
      </body>
    </html>
  )
}

export default Layout
