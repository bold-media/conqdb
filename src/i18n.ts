import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { getPayload } from './lib/payload'
import { locales } from './locales'

export interface Messages {}

const getTranslations = async (locale: string): Promise<Messages> => {
  const payload = await getPayload()

  const messages = {}

  return messages
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  const translations = await getTranslations(locale)

  return {
    messages: translations as any,
  }
})
