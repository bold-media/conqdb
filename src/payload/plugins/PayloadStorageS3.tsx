import { COLLECTION_SLUG_MEDIA } from '../collections/media/Media'
import { s3Storage } from '@payloadcms/storage-s3'

export const PayloadStorageS3 = s3Storage({
  enabled: process.env.NEXT_PUBLIC_ASSET_URL ? true : false,
  collections: {
    [COLLECTION_SLUG_MEDIA]: {
      prefix:
        process.env.NODE_ENV === 'production'
          ? COLLECTION_SLUG_MEDIA
          : `${COLLECTION_SLUG_MEDIA}-staging`,
      generateFileURL: ({ filename }) =>
        `https://assets.conqdb.com/${
          process.env.NODE_ENV === 'production'
            ? COLLECTION_SLUG_MEDIA
            : `${COLLECTION_SLUG_MEDIA}-staging`
        }/${filename}`,
    },
  },
  bucket: process.env.S3_BUCKET_NAME || '',
  config: {
    endpoint: 'https://s3.us-east-1.amazonaws.com',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_KEY || '',
    },
    region: 'us-east-1',
  },
})
