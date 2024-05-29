import 'server-only'
import { getPayloadHMR as getPayloadInstance } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export const getPayload = async () => {
  const config = await configPromise
  return getPayloadInstance({ config })
}
