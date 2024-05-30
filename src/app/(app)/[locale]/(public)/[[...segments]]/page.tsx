import { getPayload } from '@/lib/payload'
import { locales } from '@/locales'
import { ComingSoon } from '@/modules/common/templates/ComingSoon'
import { Page } from '@/modules/layout/templates/Page'
import { getPathSegments } from '@/modules/layout/utils/getPathSegments'
import { serializeLexical } from '@/modules/lexical/serializeLexical'
import { COLLECTION_SLUG_PAGE } from '@/payload/collections/page/Page'
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

const PublicPages = async ({
  params: { locale, segments },
}: {
  params: { locale: (typeof locales)[number]; segments: string[] }
}) => {
  let page
  try {
    const pathname = resolvePathname(segments)
    console.log(pathname)
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: COLLECTION_SLUG_PAGE,
      locale: locale,
      depth: 10,
      limit: 1,
      where: {
        pathname: {
          equals: pathname,
        },
      },
    })

    page = docs[0] ?? null
  } catch (error) {
    notFound()
  }

  if (!page) {
    notFound()
  }

  const content = await serializeLexical(page.content)

  console.log(content)

  return <Page>{content}</Page>
}

export default PublicPages
