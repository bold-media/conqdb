import { getPayload as getPayloadInstance } from 'payload'
import configPromise from '@payload-config'

export const getPayload = async () => {
  return getPayloadInstance({ config: await configPromise })
}
