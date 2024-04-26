import { ArrayField, Field } from 'payload/types'
import type { LinkAppearances } from '.'
import { link } from '.'
import { deepMerge } from '../../utils/deepMerge'
import { RowLabel } from './components/RowLabel'

type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>
  appearances?: LinkAppearances[] | false
}) => Field

export const linkGroup: LinkGroupType = ({ overrides = {}, appearances } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    admin: {
      components: {
        RowLabel: RowLabel,
      },
    },
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
