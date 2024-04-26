import { AfterOperationHook } from 'node_modules/payload/dist/collections/config/types'
import {
  CollectionAfterChangeHook,
  CollectionAfterOperationHook,
  PayloadRequest,
} from 'payload/types'
import { COLLECTION_SLUG_PAGE } from '../page/Page'
import { APIError } from 'payload/errors'

type ResaveArgs = {
  doc: Record<string, unknown>
  draft: boolean
  req: PayloadRequest
}
const resave = async ({ doc, draft, req }: ResaveArgs) => {
  const parentIsPublished = doc._status === 'published'

  const children = await req.payload.find({
    collection: COLLECTION_SLUG_PAGE,
    depth: 0,
    draft,
    locale: req.locale,
    req,
    where: {
      template: {
        equals: doc.id,
      },
    },
  })

  try {
    await children.docs.reduce(async (priorSave, child) => {
      await priorSave

      const childIsPublished = child._status === 'published'
    }, Promise.resolve())
  } catch (error) {}
}

export const updatePages =
  (): CollectionAfterChangeHook =>
  async ({ doc, req }) => {
    await resave({
      doc,
      draft: true,
      req,
    })

    if (doc._status === 'published') {
      await resave({
        doc,
        draft: false,
        req,
      })
    }

    return undefined
  }
