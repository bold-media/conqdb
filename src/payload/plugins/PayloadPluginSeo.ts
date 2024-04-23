import { seo } from '@payloadcms/plugin-seo'

export const PayloadPluginSeo = seo({
  collections: ['page'],
  // uploadsCollection: "media",
  // generateTitle: ({ doc }) => `ConqDB | ${doc?.title?.value}`,
})
