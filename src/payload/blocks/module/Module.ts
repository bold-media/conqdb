import { Block } from 'payload/types'
import { LoginModule } from './LoginModule'
import { ProfileModule } from './ProfileModule'
import { CreateProfileModule } from './CreateProfileModule'

export const BLOCK_SLUG_MODULE = 'module'

export const Module: Block = {
  slug: BLOCK_SLUG_MODULE,
  interfaceName: 'Module',
  fields: [
    {
      name: 'module',
      type: 'blocks',
      maxRows: 1,
      blocks: [LoginModule, ProfileModule, CreateProfileModule],
    },
  ],
}
