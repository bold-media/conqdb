import { seed } from '@/payload/seed'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest): Promise<Response> => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await seed()

      return new Response('Seeded successfully', { status: 200 })
    } else {
      return new Response('Seeding is not allowed in production', { status: 400 })
    }
  } catch (error) {
    return new Response('Failed to seed', { status: 400 })
  }
}
