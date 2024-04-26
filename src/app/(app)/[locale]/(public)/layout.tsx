import { getPayload } from '@/lib/payload'
import { locales } from '@/locales'
import { PublicLayout } from '@/modules/layout/templates/PublicLayout'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

interface PublicLayoutProps {
  children?: React.ReactNode
  params: {
    locale: (typeof locales)[number]
  }
}

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }))
// }

const Layout: React.FC<PublicLayoutProps> = async ({ children, params: { locale } }) => {
  unstable_setRequestLocale(locale)
  const payload = await getPayload()

  const layout = await payload.findGlobal({ slug: 'layout', locale: locale })

  return <PublicLayout data={layout}>{children}</PublicLayout>
}

export default Layout
