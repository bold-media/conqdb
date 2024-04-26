import { getPayload } from 'payload'
import { COLLECTION_SLUG_PAGE } from '@/payload/collections/page/Page'
import { COLLECTION_SLUG_PROFILE } from '@/payload/collections/profile/Profile'
import { GLOBAL_SLUG_SETTINGS } from '@/payload/globals/settings/Settings'
import { NextRequest, NextResponse } from 'next/server'
import payloadConfig from '@payload-config'

export const GET = async (req: NextRequest): Promise<Response> => {
  console.log('checking availability...')
  const payload = await getPayload({ config: payloadConfig })
  const searchParams = req.nextUrl.searchParams
  let response: any = {}

  const pathname = searchParams.get('pathname')
  const profileSlug = searchParams.get('profile-slug')

  try {
    if (pathname) {
      const { totalDocs: exists } = await payload.count({
        collection: COLLECTION_SLUG_PAGE,
        where: {
          pathname: {
            equals: pathname,
          },
        },
      })

      response.pathname = { [pathname]: !exists }
    }
    if (profileSlug) {
      const settings = await payload.findGlobal({ slug: GLOBAL_SLUG_SETTINGS })

      const { totalDocs: exists } = await payload.count({
        collection: COLLECTION_SLUG_PROFILE,
        where: {
          slug: {
            equals: profileSlug,
          },
        },
      })

      response.profileSlug = { [profileSlug]: !exists }
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }

  return NextResponse.json(response, { status: 200 })
}
