import { sql } from 'drizzle-orm';
import {
  boolean,
  json,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { sonyflakeId } from '../custom-types/sonyflakeId';
import { generateSonyflakeId } from '@app/utils/sonyflake';

export enum UserRole {
  MANAGER = 'manager',
  MAINTAINER = 'maintainer',
  AUTHOR = 'author',
  TRANSLATOR = 'translator',
  MEMBER = 'member',
  USER = 'user',
}

export type InferredUser = typeof user.$inferSelect;

export const user = pgTable('user', {
  id: sonyflakeId('id')
    .$default(() => generateSonyflakeId())
    .primaryKey(),
  // profileId: bigint('profile_id', { mode: 'bigint' })
  //     .unique()
  //     .references(() => profile.id)
  discordId: varchar('discord_id', { length: 256 }),
  discordUsername: varchar('discord_username', { length: 256 }),
  discordDiscriminator: varchar('discord_discriminator', { length: 256 }),
  discordAccessToken: varchar('discord_access_token', { length: 256 }),
  discordRefreshToken: varchar('discord_refresh_token', { length: 256 }),
  discordTokenExpiration: timestamp('discord_token_expiration'),
  discordAvatar: varchar('discord_avatar', { length: 256 }),
  roles: json('role').default(['user']).notNull().$type<UserRole[]>(),
  isAdmin: boolean('is_admin').default(false),
  isBanned: boolean('is_banned').default(false),
  editLanguages: json('edit_languages'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
  // .$onUpdate(
  //   () => sql`CURRENT_TIMESTAMP`,
  // ),
});
