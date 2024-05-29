import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'

export const PayloadPluginNestedDocs = nestedDocsPlugin({
  collections: ['page'],
  generateLabel: (_, doc) => doc?.title as string,
  generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`.replace(/^\/+/, '/'), ''),
})
