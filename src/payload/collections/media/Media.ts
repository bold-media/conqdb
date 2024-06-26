import { CollectionConfig } from 'payload/types'
import { generateBlurDataURL } from './hooks/generateBlurDataURL'
import { generateFilename } from './hooks/generateFilename'

export const COLLECTION_SLUG_MEDIA = 'media'

export const Media: CollectionConfig = {
  slug: COLLECTION_SLUG_MEDIA,
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'url', 'mimeType', 'updatedAt'],
  },
  hooks: {
    beforeChange: [generateFilename, generateBlurDataURL],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) =>
      /** @ts-ignore */
      `https://assets.conqdb.com/media/${doc?.sizes?.thumbnail?.filename}`,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 100,
      },
    },
    imageSizes: [
      {
        name: 'blur',
        width: 32,
        height: 32,
        fit: 'contain',
        background: 'transparent',
        formatOptions: {
          format: 'png',
        },
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'contain',
        background: 'transparent',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 100,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
