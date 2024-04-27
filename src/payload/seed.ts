import { COLLECTION_SLUG_UNIT_TYPE } from './collections/unit-type/UnitType'
import { COLLECTION_SLUG_UNIT_CATEGORY } from './collections/unit-category/UnitCategory'
import { APIError } from 'payload/errors'
import { COLLECTION_SLUG_UNIT_ERA } from './collections/unit-era/UnitEra'
import { COLLECTION_SLUG_WEAPON } from './collections/weapon/Weapon'
import { COLLECTION_SLUG_USER } from './collections/user'
import { randomBytes } from 'crypto'
import { Payload } from 'payload'

export const seed = async (payload: Payload) => {
  payload.logger.info('Seeding data...')

  try {
    const { totalDocs: userCount } = await payload.count({
      collection: COLLECTION_SLUG_USER,
    })
    const { totalDocs: unitTypeCount } = await payload.count({
      collection: COLLECTION_SLUG_UNIT_TYPE,
    })
    const { totalDocs: unitCategoryCount } = await payload.count({
      collection: COLLECTION_SLUG_UNIT_CATEGORY,
    })
    const { totalDocs: unitEraCount } = await payload.count({
      collection: COLLECTION_SLUG_UNIT_ERA,
    })
    const { totalDocs: weaponCount } = await payload.count({
      collection: COLLECTION_SLUG_WEAPON,
    })

    if (!userCount) {
      payload.logger.info('Seeding Users...')
      await payload.create({
        collection: COLLECTION_SLUG_USER,
        data: {
          email: process.env.DISCORD_USER_ID
            ? `${process.env.DISCORD_USER_ID}@discord.com`
            : `admin@conqdb.com`,
          discordId: process.env.DISCORD_USER_ID || undefined,
          password: process.env.DISCORD_USER_ID ? randomBytes(32).toString('hex') : 'password',
          roles: ['admin'],
        },
      })

      if (process.env.NODE_ENV === 'development') {
        await Promise.all([
          payload.create({
            collection: COLLECTION_SLUG_USER,
            data: {
              email: 'maintainer@conqdb.com',
              password: 'password',
              roles: ['maintainer'],
            },
          }),
          payload.create({
            collection: COLLECTION_SLUG_USER,
            data: {
              email: 'user@conqdb.com',
              password: 'password',
              roles: ['user'],
            },
          }),
        ])
      }
    }

    if (!unitTypeCount) {
      payload.logger.info('Seeding Unit Types...')
      await Promise.all([
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_TYPE,
            data: {
              name: 'Melee Infantry',
              weight: 1,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_TYPE,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Nahkampf - Infanterie',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_TYPE,
            data: {
              name: 'Ranged Infantry',
              weight: 2,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_TYPE,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Fernkampf - Infanterie',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_TYPE,
            data: {
              name: 'Cavalry',
              weight: 3,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_TYPE,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Kavallerie',
              },
            })
          }),
      ])
    }

    if (!unitCategoryCount) {
      payload.logger.info('Seeding Unit Categories...')
      await Promise.all([
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Buckler Shield',
              weight: 1,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Buckler',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Polearm',
              weight: 2,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Strangenwaffe',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Tower Shield',
              weight: 3,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Turmschild',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Javelin',
              weight: 4,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Wurfspeer',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Archer',
              weight: 5,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Bogenschütze ', //need the correct "u"
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Arquebusier',
              weight: 6,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Arkebusier',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Crossbowman',
              weight: 7,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Armbrustchütze',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Lancer',
              weight: 8,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Lancier',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Melee',
              weight: 9,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Nahkampf',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_CATEGORY,
            data: {
              name: 'Special',
              weight: 10,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_CATEGORY,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Spezial',
              },
            })
          }),
      ])
    }

    if (!unitEraCount) {
      payload.logger.info('Seeding Unit Eras...')
      await Promise.all([
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Rustic',
              weight: 1,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Finstere',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Feudal',
              weight: 2,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Feudale',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Chivalric',
              weight: 3,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Ritterliche',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Silver',
              weight: 4,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Silberne',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Heroic',
              weight: 5,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Heroische',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_UNIT_ERA,
            data: {
              name: 'Golden',
              weight: 6,
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_UNIT_ERA,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Goldene',
              },
            })
          }),
      ])
    }

    if (!weaponCount) {
      payload.logger.info('Seeding Weapons...')
      await Promise.all([
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Bow',
              type: 'light',
              weight: 1,
              slug: 'bow',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Bogen',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Dual Blades',
              type: 'light',
              weight: 2,
              slug: 'dual-blades',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Doppelklinge',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Short Bow',
              type: 'light',
              weight: 3,
              slug: 'short-bow',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Kurzbogen',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Chain Dart & Scimitar',
              type: 'light',
              weight: 4,
              slug: 'chain-dart-scimitar',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Kettenpfeil & Krummbsäbel',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Pike',
              type: 'medium',
              weight: 5,
              slug: 'pike',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Pike',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Musket',
              type: 'medium',
              weight: 6,
              slug: 'musket',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Muskete',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Nodachi',
              type: 'medium',
              weight: 7,
              slug: 'nodachi',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Nodachi',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Spear',
              type: 'medium',
              weight: 8,
              slug: 'spear',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Speer',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Shortsword & Shield',
              type: 'heavy',
              weight: 9,
              slug: 'short-sword-shield',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Kurzschwert',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Glaive',
              type: 'heavy',
              weight: 10,
              slug: 'glaive',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Glefe',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Poleaxe',
              type: 'heavy',
              weight: 11,
              slug: 'poleaxe',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Streitaxt',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Longsword & Shield',
              type: 'heavy',
              weight: 12,
              slug: 'longsword-shield',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Langschwert',
              },
            })
          }),
        payload
          .create({
            collection: COLLECTION_SLUG_WEAPON,
            data: {
              name: 'Maul',
              type: 'heavy',
              weight: 13,
              slug: 'maul',
            },
          })
          .then(async (res) => {
            await payload.update({
              collection: COLLECTION_SLUG_WEAPON,
              id: res.id,
              locale: 'de',
              data: {
                name: 'Streithammer',
              },
            })
          }),
      ])
    }
  } catch (error) {
    throw new APIError(JSON.stringify(error))
  }
}
