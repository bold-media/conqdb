import { getPayload } from '@/lib/payload'
import { COLLECTION_SLUG_UNIT_TYPE } from './collections/unit-type/UnitType'
import { COLLECTION_SLUG_UNIT_CATEGORY } from './collections/unit-category/UnitCategory'
import { APIError } from 'payload/errors'
import { COLLECTION_SLUG_UNIT_ERA } from './collections/unit-era/UnitEra'
import { COLLECTION_SLUG_WEAPON } from './collections/weapon/Weapon'

export const seed = async () => {
  const payload = await getPayload()

  payload.logger.info('Seeding data...')

  try {
    /**
     * Unit Types
     */
    await Promise.all([
      payload.create({
        collection: COLLECTION_SLUG_UNIT_TYPE,
        data: {
          name: 'Melee Infantry',
          weight: 1,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_TYPE,
        data: {
          name: 'Ranged Infantry',
          weight: 2,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_TYPE,
        data: {
          name: 'Cavalry',
          weight: 3,
        },
      }),
    ])

    /**
     * Unit Categories
     */
    await Promise.all([
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Buckler Shield',
          weight: 1,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Polearm',
          weight: 2,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Tower Shield',
          weight: 3,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Javelin',
          weight: 4,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Archer',
          weight: 5,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Arquebusier',
          weight: 6,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Crossbowman',
          weight: 7,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Lancer',
          weight: 8,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Melee',
          weight: 9,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_CATEGORY,
        data: {
          name: 'Special',
          weight: 10,
        },
      }),
    ])

    /**
     * Unit Eras
     */
    await Promise.all([
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Rustic',
          weight: 1,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Feudal',
          weight: 2,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Chivalric',
          weight: 3,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Silver',
          weight: 4,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Heroic',
          weight: 5,
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_UNIT_ERA,
        data: {
          name: 'Golden',
          weight: 6,
        },
      }),
    ])

    /**
     * Weapons
     */
    await Promise.all([
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Bow',
          type: 'light',
          weight: 1,
          slug: 'bow',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Dual Blades',
          type: 'light',
          weight: 2,
          slug: 'dual-blades',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Short Bow',
          type: 'light',
          weight: 3,
          slug: 'short-bow',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Chain Dart & Scimitar',
          type: 'light',
          weight: 4,
          slug: 'chain-dart-scimitar',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Pike',
          type: 'medium',
          weight: 5,
          slug: 'pike',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Musket',
          type: 'medium',
          weight: 6,
          slug: 'musket',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Nodachi',
          type: 'medium',
          weight: 7,
          slug: 'nodachi',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Spear',
          type: 'medium',
          weight: 8,
          slug: 'spear',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Shortsword & Shield',
          type: 'heavy',
          weight: 9,
          slug: 'short-sword-shield',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Glaive',
          type: 'heavy',
          weight: 10,
          slug: 'glaive',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Poleaxe',
          type: 'heavy',
          weight: 11,
          slug: 'poleaxe',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Longsword & Shield',
          type: 'heavy',
          weight: 12,
          slug: 'longsword-shield',
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG_WEAPON,
        data: {
          name: 'Maul',
          type: 'heavy',
          weight: 13,
          slug: 'maul',
        },
      }),
    ])
  } catch (error) {
    throw new APIError(JSON.stringify(error))
  }
}
