import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { COLLECTION_SLUG_MEDIA } from '../collections/media/Media'

export const adapter = s3Adapter({
  config: {
    endpoint: 'https://s3.us-east-1.amazonaws.com',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY || '',
      secretAccessKey: process.env.AWS_SECRET_KEY || '',
    },
    region: 'us-east-1',
  },
  bucket: process.env.S3_BUCKET_NAME || '',
})

export const PayloadPluginCloudStorage = cloudStorage({
  enabled: process.env.AWS_ACCESS_KEY ? true : false,
  collections: {
    [COLLECTION_SLUG_MEDIA]: {
      adapter,
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
})
