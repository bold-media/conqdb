import { APIError } from 'payload/errors'
import { CollectionBeforeChangeHook } from 'payload/types'

export const generateBlurDataURL: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      const base64String = req?.payloadUploadSizes?.blur.toString('base64')
      const blurDataURL = `data:image/png};base64,${base64String}`

      return {
        ...data,
        blurDataURL,
      }
    } catch (error) {
      throw new APIError('Failed to generate blur data url')
    }
  }
}
