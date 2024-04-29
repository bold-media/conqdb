'use client'

import { useRowLabel } from '@payloadcms/ui/forms/RowLabel/Context'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import React from 'react'
import { RowLabel as PayloadRowLabel } from '@payloadcms/ui/forms/RowLabel'

export const RowLabel = () => {
  const { data, path } = useRowLabel<any>()
  const { i18n } = useTranslation()

  return <PayloadRowLabel i18n={i18n} path={path} rowLabel={data?.feature || ''} />
}
