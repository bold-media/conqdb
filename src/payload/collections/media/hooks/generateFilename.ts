import { CollectionBeforeChangeHook } from 'payload/types'
import { APIError } from 'payload/errors'
import { generateUniqueFilename } from '@/payload/utils/generateUniqueFilename'
import { randomUUID } from 'crypto'

export const generateFilename: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation !== 'create') return data

  return {
    ...data,
    filename: generateUniqueFilename(data.filename),
    sizes: {
      blur: {
        ...data.sizes.blur,
        filename: `${generateUniqueFilename(data.sizes.blur.filename)}`,
      },
      thumbnail: {
        ...data.sizes.thumbnail,
        filename: `${generateUniqueFilename(data.sizes.thumbnail.filename)}`,
      },
    },
  }
}
