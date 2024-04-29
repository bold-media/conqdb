import {
  AlignFeature,
  BoldFeature,
  FeatureProviderServer,
  lexicalEditor,
  LexicalRichTextAdapter,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { Field, RichTextField } from 'payload/types'
import { pickKeys } from '../utils/pickKeys'
import { COLLECTION_SLUG_PAGE } from '../collections/page/Page'

export const lexicalTextEditor: LexicalRichTextAdapter = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...(pickKeys(defaultFeatures, [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'inlinecode',
      'paragraph',
      'align',
    ]) as FeatureProviderServer<unknown, unknown>[]),
    LinkFeature({
      enabledCollections: ['page'],
    }) as FeatureProviderServer<unknown, unknown>,
  ],
})
