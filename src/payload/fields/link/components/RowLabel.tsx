'use client'
import { RowLabel as PayloadRowLabel } from '@payloadcms/ui/forms/RowLabel'
import { useRowLabel } from '@payloadcms/ui/forms/RowLabel/Context'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { LinkField } from 'payload-types'

interface LinkGroupItem {
  link: LinkField
}

export const RowLabel = () => {
  const { data, path } = useRowLabel<LinkGroupItem>()
  const { i18n } = useTranslation()

  return <PayloadRowLabel i18n={i18n} path={path} rowLabel={data?.link?.label || ''} />
}
