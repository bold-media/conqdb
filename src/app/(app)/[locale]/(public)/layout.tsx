import { PublicLayout } from '@/modules/layout/templates/PublicLayout'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

interface PublicLayoutProps {
  children?: React.ReactNode
  params: {
    locale: string
  }
}

const Layout: React.FC<PublicLayoutProps> = ({ children, params }) => {
  unstable_setRequestLocale(params.locale)
  return <PublicLayout>{children}</PublicLayout>
}

export default Layout
