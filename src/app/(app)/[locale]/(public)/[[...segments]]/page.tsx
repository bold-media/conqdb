'use client'
import { ComingSoon } from '@/modules/common/templates/ComingSoon'
import { Page } from '@/modules/layout/templates/Page'
import { usePathname } from '@/navigation'
import { notFound } from 'next/navigation'
import React from 'react'

const PublicPages: React.FC = ({}) => {
  const pathname = usePathname()

  if (pathname !== '/') {
    notFound()
  }

  return (
    <Page>
      <ComingSoon />
    </Page>
  )
}

export default PublicPages
