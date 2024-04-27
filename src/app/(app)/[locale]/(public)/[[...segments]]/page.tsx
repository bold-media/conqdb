import { getPayload } from '@/lib/payload'
import { locales } from '@/locales'
import { ComingSoon } from '@/modules/common/templates/ComingSoon'
import { Page } from '@/modules/layout/templates/Page'
import { getPathSegments } from '@/modules/layout/utils/getPathSegments'
import { resolvePathname } from '@/utils/resolvePathname'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export const generateStaticParams = async () => {
  const payload = await getPayload()
  const pages = await payload.find({
    collection: 'page',
    limit: 0,
  })

  return pages?.docs?.map((page) => ({
    slug: getPathSegments(page?.pathname || '/'),
  }))
}

export async function generateMetadata(
  {
    params: { locale, segments },
  }: { params: { locale: (typeof locales)[number]; segments: string[] } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const pathname = resolvePathname(segments)

  const payload = await getPayload()

  try {
    let page

    const data = await payload.find({
      collection: 'page',
      where: {
        pathname: {
          equals: pathname,
        },
      },
      locale: locale,
      depth: 2,
    })

    page = data?.docs[0] || null

    return {
      title: page?.title ? `${page?.title} | ConqDB` : 'ConqDB',
    }
  } catch (error) {
    console.error(error)
  }

  return {
    title: 'ConqDB',
  }
}

const PublicPages: React.FC = ({}) => {
  return (
    <Page>
      <ComingSoon />
    </Page>
  )
}

export default PublicPages
