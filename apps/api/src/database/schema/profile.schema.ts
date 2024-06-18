import {
  json,
  pgTable,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { generateSonyflakeId } from '@app/utils/sonyflake';
import { user } from './user.schema';
import { relations } from 'drizzle-orm';

export const profile = pgTable('profile', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  userId: sonyflakeId('user_id')
    .unique()
    .references(() => user.id),
  username: varchar('username', { length: 256 }).notNull(),
  previousUsernames: json('previous_usernames').default([]),
  slug: varchar('slug', { length: 256 }).notNull(),
  level: smallint('level'),
  levelLastUpdatedAt: timestamp('level_last_updated_at', {
    mode: 'date',
  }).defaultNow(),
  lightLeadership: smallint('light_leadership'),
  mediumLeadership: smallint('medium_leadership'),
  heavyLeadership: smallint('heavy_leadership'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});

export const profileRelations = relations(profile, ({ one, many }) => ({
  // units: many(profileUnit),
  // languages: many(profileLanguage),
  // weapons: many(profileWeapon),
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));
