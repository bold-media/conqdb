import { randomUUID } from 'crypto'

/**
 * Generates a new filename with a UUID while retaining the original file extension.
 * @param filename The original filename including its extension.
 * @returns A new filename with a UUID.
 */
export const generateUniqueFilename = (filename: string): string => {
  // Extract the file extension
  const extension = filename.split('.').pop() || ''

  // Generate a UUID
  const uuid = randomUUID()

  // Combine the UUID with the original file extension
  return `${uuid}.${extension}`
}
