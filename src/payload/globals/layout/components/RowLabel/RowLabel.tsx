'use client'
import { RowLabel as PayloadRowLabel } from '@payloadcms/ui/forms/RowLabel'
import { useRowLabel } from '@payloadcms/ui/forms/RowLabel/Context'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { HeaderLinks } from 'payload-types'

type HeaderLinkEntry = NonNullable<HeaderLinks>[number]

export const RowLabel = () => {
  const { data, path } = useRowLabel<HeaderLinkEntry>()
  const { i18n } = useTranslation()

  return (
    <PayloadRowLabel
      i18n={i18n}
      path={path}
      rowLabel={data.type === 'dropdown' ? data?.label || '' : data?.link?.label || ''}
    />
  )
}
