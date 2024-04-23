import { NotFound } from '@/modules/common/templates/NotFound'
import { Page } from '@/modules/layout/templates/Page'
import { getLocale, unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <Page>
      <NotFound />
    </Page>
  )
}

export default NotFoundPage
