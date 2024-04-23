import { getPayload } from './lib/payload'

export const register = async () => {
  if (process.env.NODE_ENV === 'production') {
    const payload = await getPayload()
    try {
      payload.logger.info('Running migrations...')

      await payload.db.migrate()

      payload.logger.info('Migrations complete.')
    } catch (error) {
      payload.logger.info('Migrations failed.')
    }
  }
}
